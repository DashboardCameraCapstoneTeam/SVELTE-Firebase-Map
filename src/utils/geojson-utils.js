/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
import { getVehicleSpeedColor } from './color-generator';

export const gpsJsonToGeojson = (data) => {
  const geojson = { type: 'FeatureCollection', features: [] };
  for (const point of data) {
    const coordinate = [point.longitude, point.latitude];
    const color = getVehicleSpeedColor(point.speed);
    const properties = {
      deviceId: point.deviceId,
      gpsSpeed: point.speed,
      gpsReason: point.gps_reason,
      gpsValid: point.gps_valid,
      gpsIgnition: point.ignition,
      time: point.time.value,
      gpsColor: color,
    };
    const temp = [coordinate[1], coordinate[0]];
    properties.coordinates = temp.toString();
    const feature = { type: 'Feature', geometry: { type: 'Point', coordinates: coordinate }, properties };
    geojson.features.push(feature);
  }
  return geojson;
};

export default gpsJsonToGeojson;
