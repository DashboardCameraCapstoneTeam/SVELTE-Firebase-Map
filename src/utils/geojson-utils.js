/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
import { v4 as uuidv4 } from 'uuid';

export const gpsJsonToGeojson = (rawData) => {
  const geoJsonArray = [];
  rawData.forEach((rawGeoJsonFile) => {
    const dataName = rawGeoJsonFile.dataName ? rawGeoJsonFile.dataName : uuidv4();
    const dateTime = rawGeoJsonFile.dateTime ? rawGeoJsonFile.dataName : uuidv4();
    const dataType = rawGeoJsonFile.dataType ? rawGeoJsonFile.dataType : rawGeoJsonFile.features[0].geometry.type;
    const geoJson = {
      type: 'FeatureCollection',
      dataName,
      dateTime,
      dataType,
      features: [],
    };
    for (const point of rawGeoJsonFile.features) {
      const coordinate = [point.geometry.coordinates[0], point.geometry.coordinates[1]];
      let properties = {};
      if (point.properties === null) {
        properties = {
          Id: point.properties.Id ? point.properties.Id : uuidv4(),
          Item: point.properties.Item ? point.properties.Item : 'POI',
          Count: point.properties.Count ? point.properties.Count : 1,
          Time: point.properties.Time ? point.properties.Time : '00-00',
          Color: point.properties['marker-color'] ? point.properties['marker-color'] : 'Green',
        };
      }

      properties = point.properties;
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
