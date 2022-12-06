import {
  sortByTimeRecentToOldest,
  sortByTimeOldestToRecent,
  sortBySizeSmallToLarge,
} from '../src/utils/sorting-video-assets';

describe('sortByTimeRecentToOldest', () => {
  test('sorts an array of videos by their createdTime in descending order', () => {
    const videoArray = [{ createdTime: '2022-12-01T15:30:00', size: 100 }, { createdTime: '2022-12-02T13:15:00', size: 200 }, { createdTime: '2022-11-30T08:45:00', size: 300 }];
    const expected = [{ createdTime: '2022-12-02T13:15:00', size: 200 }, { createdTime: '2022-12-01T15:30:00', size: 100 }, { createdTime: '2022-11-30T08:45:00', size: 300 }];

    expect(sortByTimeRecentToOldest(videoArray)).toEqual(expected);
  });
});

describe('sortByTimeOldestToRecent', () => {
  test('sorts an array of videos by their createdTime in ascending order', () => {
    const videoArray = [{ createdTime: '2022-12-01T15:30:00', size: 100 }, { createdTime: '2022-12-02T13:15:00', size: 200 }, { createdTime: '2022-11-30T08:45:00', size: 300 }];
    const expected = [{ createdTime: '2022-11-30T08:45:00', size: 300 }, { createdTime: '2022-12-01T15:30:00', size: 100 }, { createdTime: '2022-12-02T13:15:00', size: 200 }];

    expect(sortByTimeOldestToRecent(videoArray)).toEqual(expected);
  });
});

describe('sortBySizeSmallToLarge', () => {
  test('sorts an array of videos by their size in ascending order', () => {
    const videoArray = [{ createdTime: '2022-12-01T15:30:00', size: 100 }, { createdTime: '2022-12-02T13:15:00', size: 200 }, { createdTime: '2022-11-30T08:45:00', size: 300 }];
    const expected = [{ createdTime: '2022-12-01T15:30:00', size: 100 }, { createdTime: '2022-12-02T13:15:00', size: 200 }, { createdTime: '2022-11-30T08:45:00', size: 300 }];

    expect(sortBySizeSmallToLarge(videoArray)).toEqual(expected);
  });
});
