import { roundToNearestCent, currencyFormatter, currencyWithoutCentsFormatter } from '../monetaryCalculations';

test('Round down to the nearest cent', () => {
  expect(roundToNearestCent(100.123)).toBe(100.12);
});

test('Round up to the nearest cent', () => {
  expect(roundToNearestCent(100.789)).toBe(100.79);
});

test('Round up to the nearest cent when that increases the dollar value', () => {
  expect(roundToNearestCent(100.999)).toBe(101.0);
});

test.each([
  [123.45, '$123.45'],
  [1234.56, '$1,234.56'],
])('Format %d to USD currency %s', (inputNumber, expectedOutputString) => {
  expect(currencyFormatter(inputNumber)).toEqual(expectedOutputString);
});

test.each([
  [123.45, '$123'],
  [1234.56, '$1,234'],
  [70000, '$70,000'],
  [70000.0, '$70,000'],
])('Format %d to USD currency %s', (inputNumber, expectedOutputString) => {
  expect(currencyWithoutCentsFormatter(inputNumber)).toEqual(expectedOutputString);
});
