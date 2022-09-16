/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */

const calculateAverage = (data) => {
  const averageList = [];
  for (const [key, pointList] of Object.entries(data)) {
    if (pointList.length >= 1) {
      const average = parseInt(pointList.reduce((total, next) => total + next.properties.Count, 0) / pointList.length, 10);
      averageList.push({ time: key, value: average });
    } else {
      averageList.push({ time: key, value: 0 });
    }
  }
  return averageList;
};

const parseDateFromDateString = (dateString, filterDate) => {
  const date = new Date(dateString);
  let parsedDate = '';
  switch (filterDate) {
    case 'y':
      parsedDate = date.getFullYear();
      break;
    case 'm':
      parsedDate = date.getMonth();
      break;
    case 'd':
      parsedDate = date.getDay();
      break;
    default:
      parsedDate = date.getFullYear();
      break;
  }
  return parsedDate;
};

// Organize the data into groups based on the date
const organizeData = (data, filterDate) => {
  const groups = {};
  data.forEach((point) => {
    const parsedDate = parseDateFromDateString(point.properties.Time, filterDate);
    if (parsedDate in groups) {
      groups[parseInt(parsedDate, 10)].push(point);
    } else {
      groups[parseInt(parsedDate, 10)] = new Array(point);
    }
  });
  return groups;
};

// Only get the data that has been selected
const filterData = (data, selectedDate, filterDate) => {
  const results = data.filter((point) => {
    const parsedDate = parseDateFromDateString(point.properties.Time, filterDate);
    return parseInt(parsedDate, 10) === selectedDate;
  });
  return results;
};

// Convert the month numbers to month string
const toMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString('en-US', {
    month: 'short',
  });
};

// Fill all of the remaining data with zero
// We start with 1 in the index because days start with 1, not 0
const fillRemainingGroup = (groups, max) => {
  const finalGroup = {};
  for (let i = 1; i <= max; i += 1) {
    finalGroup[i] = i in groups ? groups[i] : [];
  }
  return finalGroup;
};

export const getYearData = (geojson) => {
  const groups = organizeData(geojson.features, 'y');
  const yearList = calculateAverage(groups);
  return yearList;
};

export const getMonthData = (geojson, selectedYear) => {
  const yearData = filterData(geojson.features, selectedYear, 'y');
  const groups = organizeData(yearData, 'm');
  const finalGroup = fillRemainingGroup(groups, 12);
  const monthList = calculateAverage(finalGroup);

  // Convert the month numbers to actual month strings (Jan, Feb, Mar, ...)
  for (let i = 0; i < 12; i += 1) {
    monthList[i].time = toMonthName(monthList[i].time);
  }
  return monthList;
};

export const getDayData = (geojson, selectedYear, selectedMonth) => {
  const yearData = filterData(geojson.features, selectedYear, 'y');
  const monthData = filterData(yearData, selectedMonth, 'm');
  const groups = organizeData(monthData, 'm');
  const finalGroup = fillRemainingGroup(groups, 32);
  const dayList = calculateAverage(finalGroup);
  return dayList;
};
