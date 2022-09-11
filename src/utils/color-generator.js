import { speedColorSplit, speedColors } from '../constants';

// Divide the speed by the split (10km/h) to calculate the index
// Use the index to get a color from the speed colors array
export const getVehicleSpeedColor = (speed) => {
  let speedIndex = parseInt(speed / speedColorSplit, 10);
  if (speedIndex >= speedColors.length) {
    speedIndex = speedColors.length;
  }
  return speedColors[speedIndex];
};

export default getVehicleSpeedColor;
