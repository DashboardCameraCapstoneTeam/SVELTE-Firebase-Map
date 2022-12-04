import {
  calculateFileSizeString,
} from '../src/utils/file-size';

test('returns 0 Bytes for 0 bytes', () => {
  expect(calculateFileSizeString(0)).toBe('0 Bytes');
});

test('converts bytes to KB', () => {
  expect(calculateFileSizeString(1024)).toBe('1.00 KB');
});

test('converts bytes to MB', () => {
  expect(calculateFileSizeString(1048576)).toBe('1.00 MB');
});

test('converts bytes to GB', () => {
  expect(calculateFileSizeString(1073741824)).toBe('1.00 GB');
});

test('uses the specified number of decimal places', () => {
  expect(calculateFileSizeString(1024, 0)).toBe('1 KB');
  expect(calculateFileSizeString(1024, 1)).toBe('1.0 KB');
  expect(calculateFileSizeString(1024, 2)).toBe('1.00 KB');
});
