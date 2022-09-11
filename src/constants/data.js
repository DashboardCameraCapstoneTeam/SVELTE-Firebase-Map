function getFullWindowPath() {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return null;
}

export const Data = {
  NEIGHBOURHOODS_URL: `${getFullWindowPath()}/Data/neighbourhoods.geojson`,
  TREES_URL: `${getFullWindowPath()}/Data/trees.geojson`,
  SIDEWALK_URL: `${getFullWindowPath()}/Data/sidewalk.geojson`,
  ROADWORK_URL: `${getFullWindowPath()}/Data/roadwork.geojson`,
  TREES_SEARCH_URL: 'https://mapboxdemoapi.ue.r.appspot.com/trees',
};

export default Data;
