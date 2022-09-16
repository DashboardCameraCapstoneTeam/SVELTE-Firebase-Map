/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
export const gpsJsonToGeojson = (rawData) => {
  const geojson = { type: 'FeatureCollection', features: [] };
  rawData.forEach((data) => {
    for (const point of data.features) {
      const coordinate = [point.geometry.coordinates[0], point.geometry.coordinates[1]];
      const properties = {
        Id: point.properties.id,
        Item: point.properties.object_name,
        Count: point.properties.count,
        Time: point.properties.date_time_analyzed,
        Color: point.properties['marker-color'],
      };
      const feature = { type: 'Feature', geometry: { type: 'Point', coordinates: coordinate }, properties };
      geojson.features.push(feature);
    }
  });
  return geojson;
};

export default gpsJsonToGeojson;
