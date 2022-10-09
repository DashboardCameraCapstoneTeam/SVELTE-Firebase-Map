/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
export const gpsJsonToGeojson = (rawData) => {
  const geoJsonArray = [];
  rawData.forEach((rawGeoJsonFile) => {
    const dataName = rawGeoJsonFile.features[0].properties.object_name + rawGeoJsonFile.features[0].properties.date_time_analyzed;
    const dataType = rawGeoJsonFile.features[0].geometry.type;
    const geoJson = {
      type: 'FeatureCollection',
      dataName,
      dataType,
      features: [],
    };
    for (const point of rawGeoJsonFile.features) {
      const coordinate = [point.geometry.coordinates[0], point.geometry.coordinates[1]];
      const properties = {
        Id: point.properties.id,
        Item: point.properties.object_name,
        Count: point.properties.count,
        Time: point.properties.date_time_analyzed,
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
