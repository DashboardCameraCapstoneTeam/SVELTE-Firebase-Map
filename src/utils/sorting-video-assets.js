export const sortByTimeRecentToOldest = (videoArray) => {
  const sortedArray = videoArray.sort(
    (objA, objB) => objB.createdTime - objA.createdTime,
  );
  return sortedArray;
};

export const sortByTimeOldestToRecent = (videoArray) => {
  const sortedArray = videoArray.sort(
    (objA, objB) => objA.createdTime - objB.createdTime,
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
