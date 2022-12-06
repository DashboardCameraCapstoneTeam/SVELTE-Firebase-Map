import {
  getSpeed,
} from '../src/utils/geojson-utils';

test('returns 0 if properties object is empty', () => {
  expect(getSpeed({})).toBe(0);
});

test('returns 0 if properties object does not contain a speed property', () => {
  expect(getSpeed({ color: 'red', size: 'large' })).toBe(0);
});

test('returns the value of the speed property if it exists', () => {
  expect(getSpeed({ color: 'red', speed: 'fast' })).toBe('fast');
  expect(getSpeed({ speed: 'medium' })).toBe('medium');
});

test('ignores case when looking for the speed property', () => {
  expect(getSpeed({ color: 'red', SPEED: 'fast' })).toBe('fast');
  expect(getSpeed({ SPEED: 'medium' })).toBe('medium');
});
