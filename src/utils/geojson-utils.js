/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
import { v4 as uuidv4 } from 'uuid';
import { convertDateTimeToString } from './date-time-converter';

const getSpeed = (properties) => {
  for (const [key, value] of Object.entries(properties)) {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('speed')) {
      return value;
    }
  }
  return 0;
};

export const gpsJsonToGeojson = (rawData) => {
  const geoJsonArray = [];
  rawData.forEach((rawGeoJsonFile) => {
    const dataId = rawGeoJsonFile.dataId || null;
    const dataName = rawGeoJsonFile.dataName || uuidv4();
    const dateTime = rawGeoJsonFile.dateTime ? convertDateTimeToString(rawGeoJsonFile.dateTime) : null;
    const dataType = rawGeoJsonFile.dataType || rawGeoJsonFile.features[0].geometry.type;
    const hasFilter = !!rawGeoJsonFile.dataName; // If the name exists, that means we need to make a filter

    const geoJson = {
      type: 'FeatureCollection',
      dataId,
      dataName,
      dateTime,
      dataType,
      hasFilter,
      features: [],
    };
    for (const point of rawGeoJsonFile.features) {
      const coordinate = [point.geometry.coordinates[0], point.geometry.coordinates[1]];
      let properties = {};
      if (point.properties === null) {
        properties = {
          Id: `Firebase-${uuidv4()}`,
          Item: 'POI',
          Count: 1,
          Color: 'Green',
        };
      } else {
        properties = point.properties;
        properties['Speed'] = getSpeed(properties);
        properties['Color'] = point.properties['Color'] || '#53a548';
      }

      const feature = {
        type: 'Feature',
        geometry: { type: point.geometry.type, coordinates: coordinate },
        properties,
      };
      geoJson.features.push(feature);
    }
    geoJsonArray.push(geoJson);
  });
  return geoJsonArray;
};

export const rawGPSDataToGeojsonData = (data, name = 'General', geojsonDataType = 'Point', color = 'Blue') => {
  const rawData = JSON.parse(data);
  //* Set initial Geojson element details
  const dataName = rawData.dataName || name;
  const dateTime = rawData.dateTime || uuidv4();
  const dataType = rawData.dataType || geojsonDataType;

  //* Create Geojson feature collection
  const geoJson = {
    type: 'FeatureCollection',
    dataName,
    dateTime,
    dataType,
    features: [],
  };

  console.log(rawData);
  //* For every bigquery row create a GEOJSON GPS element
  for (const gpsElement of rawData.features) {
    console.log(gpsElement);
    const coordinates = gpsElement.geometry.coordinates;
    const properties = gpsElement.properties;
    properties.Size = 1;
    properties.Color = color;

    //* Create the final feature config and add the feature id for the ability to hover
    const feature = {
      type: 'Feature', geometry: { type: geojsonDataType, coordinates }, properties,
    };
    geoJson.features.push(feature);
  }
  return geoJson;
};

export default gpsJsonToGeojson;
