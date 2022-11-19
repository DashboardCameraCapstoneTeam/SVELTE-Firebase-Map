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

export default gpsJsonToGeojson;
