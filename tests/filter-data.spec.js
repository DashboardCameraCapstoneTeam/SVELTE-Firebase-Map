/* eslint-disable no-unused-vars */
import {
  getListOfObjectWhereKeyContainsString,
  getObjectsWhereKeyAnyValidStrings,
  getObjectsWhereKeyEqualsValue,
  checkIfElementExists,
  removeObjectWhereValueEqualsString,
  getGoogleDriveCoordFile,
} from '../src/utils/filter-data';

test('getListOfObjectWhereKeyContainsString is valid', () => {
  const input = [{ Name: 'Alex' }, { Name: 'Bush' }, { Name: 'Mark' }];
  expect(getListOfObjectWhereKeyContainsString(input, 'Name', 'Alex')).toStrictEqual([{ Name: 'Alex' }]);
});

test('getObjectsWhereKeyAnyValidStrings is valid', () => {
  const input = [{ Name: 'Alex' }, { Name: 'Bush' }, { Name: 'Mark' }];
  expect(getObjectsWhereKeyAnyValidStrings(input, 'Name', ['Alex', 'Mark'])).toStrictEqual([{ Name: 'Alex' }, { Name: 'Mark' }]);
});

test('getObjectsWhereKeyEqualsValue is valid', () => {
  const input = [{ Name: 'Alex' }, { Name: 'Bush' }, { Name: 'Mark' }];
  expect(getObjectsWhereKeyEqualsValue(input, 'Name', 'Alex')).toStrictEqual([{ Name: 'Alex' }]);
});

test('getObjectsWhereKeyEqualsValue is not valid', () => {
  const input = [{ Name: 'Alex' }, { Name: 'Bush' }, { Name: 'Mark' }];
  expect(getObjectsWhereKeyEqualsValue(input, 'Name', 'Alex C')).not.toBe([{ Name: 'Alex' }]);
});

test('checkIfElementExists valid', () => {
  const input = [{ Name: 'Alex' }, { Name: 'Bush' }, { Name: 'Mark' }];
  expect(checkIfElementExists(input, 'Name', 'Alex')).toBeDefined();
});

test('checkIfElementExists is valid', () => {
  const input = [{ Name: 'Alex' }, { Name: 'Bush' }, { Name: 'Mark' }];
  expect(checkIfElementExists(input, 'Name', 'Alex')).toBe(true);
});

test('checkIfElementExists is valid', () => {
  const input = [{ Name: 'Alex' }, { Name: 'Bush' }, { Name: 'Mark' }];
  expect(checkIfElementExists(input, 'Name', 'Mary')).toBe(false);
});

test('removeObjectWhereValueEqualsString is valid', () => {
  const input = [{ Name: 'Alex' }, { Name: 'Bush' }, { Name: 'Mark' }];
  expect(removeObjectWhereValueEqualsString(input, 'Name', 'Alex')).toStrictEqual([{ Name: 'Bush' }, { Name: 'Mark' }]);
});

describe('getListOfObjectWhereKeyContainsString', () => {
  test('returns an array of objects where the specified key contains the specified string', () => {
    const listOfObjects = [
      { id: 1, name: 'apple', color: 'red' },
      { id: 2, name: 'banana', color: 'yellow' },
      { id: 3, name: 'grape', color: 'purple' },
      { id: 4, name: 'orange', color: 'orange' },
      { id: 5, name: 'strawberry', color: 'red' },
    ];

    const expected = [
      { id: 2, name: 'banana', color: 'yellow' },
      { id: 4, name: 'orange', color: 'orange' },
    ];

    expect(getListOfObjectWhereKeyContainsString(listOfObjects, 'name', 'an')).toEqual(expected);
  });
});
