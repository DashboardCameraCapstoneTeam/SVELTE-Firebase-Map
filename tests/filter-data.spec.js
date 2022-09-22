/* eslint-disable no-unused-vars */
import {
  getListOfObjectWhereKeyContainsString, getObjectsWhereKeyAnyValidStrings,
  getObjectsWhereKeyEqualsValue, checkIfElementExists,
  removeObjectWhereValueEqualsString,
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
