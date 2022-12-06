import {
  isDevelopment, isProduction, isTest,
} from '../src/utils/environment-helpers';

// Jest test isDevelopment is valid
test('isDevelopment is valid', () => {
  expect(isDevelopment()).toBeDefined();
});

// Jest test isProduction is valid
test('isProduction is valid', () => {
  expect(isProduction()).toBeDefined();
});

// Jest test isTest is valid
test('isTest is valid', () => {
  expect(isTest()).toBeDefined();
});
