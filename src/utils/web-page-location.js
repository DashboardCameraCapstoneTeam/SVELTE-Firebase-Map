export const getCurrentWebpageLocation = () => {
  const currentLocation = `${window.location.protocol}//${window.location.host}`;
  const rawUrl = `${currentLocation}/data/`;

  return rawUrl;
};

export default getCurrentWebpageLocation;
