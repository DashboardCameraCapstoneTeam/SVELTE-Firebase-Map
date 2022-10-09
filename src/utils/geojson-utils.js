/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
export const gpsJsonToGeojson = (rawData) => {
  const geoJsonArray = [];
  rawData.forEach((rawGeoJsonFile) => {
    const dataName = rawGeoJsonFile.dataName;
    const dateTime = rawGeoJsonFile.dateTime;
    const dataType = rawGeoJsonFile.dataType;
    const geoJson = {
      type: 'FeatureCollection',
      dataName,
      dateTime,
      dataType,
      features: [],
    };
    for (const point of rawGeoJsonFile.features) {
      const coordinate = [point.geometry.coordinates[0], point.geometry.coordinates[1]];
      const properties = {
        Id: point.properties.Id,
        Item: point.properties.Item,
        Count: point.properties.Count,
        Time: point.properties.Time,
        Color: point.properties['marker-color'],
      };
      const feature = {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: coordinate },
        properties,
      };
      geoJson.features.push(feature);
    }
    geoJsonArray.push(geoJson);
  });
  return geoJsonArray;
};

export default gpsJsonToGeojson;
