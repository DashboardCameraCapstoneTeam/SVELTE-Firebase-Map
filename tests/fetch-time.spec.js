import {
  getCurrentDateTime, getCurrentDate, getCurrentDateInYYYYMMDD, getCurrentTime,
} from '../src/utils/fetch-time';

// Jest test get current date time is valid
test('getCurrentDateTime is valid', () => {
  expect(getCurrentDateTime()).toBeDefined();
});

// Jest test get current date is valid
test('getCurrentDate is valid', () => {
  expect(getCurrentDate()).toBeDefined();
});

test('getCurrentDateInYYYYMMDD is valid', () => {
  expect(getCurrentDateInYYYYMMDD()).toBeDefined();
});

test('getCurrentTime is valid', () => {
  expect(getCurrentTime()).toBeDefined();
});

test('getCurrentTime is valid', () => {
  expect(getCurrentTime()).toBeDefined();
});
