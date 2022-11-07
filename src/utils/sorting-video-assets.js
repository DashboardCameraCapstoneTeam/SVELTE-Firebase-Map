export const sortByTimeRecentToOldest = (videoArray) => {
  const sortedArray = videoArray.sort(
    (objA, objB) => new Date(objB.createdTime) - new Date(objA.createdTime),
  );
  return sortedArray;
};

export const sortByTimeOldestToRecent = (videoArray) => {
  const sortedArray = videoArray.sort(
    (objA, objB) => new Date(objA.createdTime) - new Date(objB.createdTime),
  );
  return sortedArray;
};

export const sortBySizeSmallToLarge = (videoArray) => {
  const sortedArray = videoArray.sort(
    (objA, objB) => objA.size - objB.size,
  );
  return sortedArray;
};

export const sortBySizeLargeToSmall = (videoArray) => {
  const sortedArray = videoArray.sort(
    (objA, objB) => objB.size - objA.size,
  );
  return sortedArray;
};
