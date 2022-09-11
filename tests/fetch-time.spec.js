import { getCurrentDateTime, getCurrentDate } from '../src/utils/fetch-time';

// Jest test get current date time is valid
test('getCurrentDateTime is valid', () => {
  expect(getCurrentDateTime()).toBeDefined();
});

// Jest test get current date is valid
test('getCurrentDate is valid', () => {
  expect(getCurrentDate()).toBeDefined();
});
