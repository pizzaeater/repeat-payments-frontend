import { timeRangeFromDates, doesTimeRangeIncludesDate, extendTimeRange, timeRangeFromDays } from '../models/TimeRange';
import Day from '../models/Day';

test('time range from dates', () => {
  const timeRange = timeRangeFromDates(
    new Date(2020, 11, 31, 23, 59),
    new Date(2021, 0, 1, 0, 1),
  );

  expect(new Date(2020, 11, 31, 23, 59).getTime()).toBe(timeRange.start.getTime());
  expect(new Date(2021, 0, 1, 0, 1).getTime()).toBe(timeRange.end.getTime());
});

test('time range from days', () => {
  const timeRange = timeRangeFromDays(
    new Day(new Date(2020, 11, 31)),
    new Day(new Date(2021, 0, 1)),
  );

  expect(new Date(2020, 11, 31).getTime()).toBe(timeRange.start.getTime());
  expect(new Date(2021, 0, 2).getTime()).toBe(timeRange.end.getTime());
});

test('time range extends', () => {
  const timeRange = timeRangeFromDates(
    new Date(2020, 11, 31),
    new Date(2021, 0, 1),
  );

  const extendedTimeRange = extendTimeRange(timeRange, 1, 1);
  expect(new Date(2020, 11, 23).getTime()).toBeLessThan(extendedTimeRange.start.getTime());
  expect(new Date(2020, 11, 24).getTime()).toBeGreaterThanOrEqual(extendedTimeRange.start.getTime());
  expect(new Date(2021, 0, 8).getTime()).toBeLessThanOrEqual(extendedTimeRange.end.getTime());
  expect(new Date(2021, 0, 9).getTime()).toBeGreaterThan(extendedTimeRange.end.getTime());
});

test('time range includes date', () => {
  const date = new Date(2021, 0, 1);
  const timeRange = timeRangeFromDates(
    new Date(2020, 11, 31, 23, 59),
    new Date(2021, 0, 1, 0, 1),
  );

  expect(doesTimeRangeIncludesDate(date, timeRange)).toBe(true);
});

test('time range doesn\'t includes earlier date', () => {
  const date = new Date(2021, 0, 1);
  const timeRange = timeRangeFromDates(
    new Date(2021, 0, 1, 0, 1),
    new Date(2021, 11, 31, 23, 59),
  );

  expect(doesTimeRangeIncludesDate(date, timeRange)).toBe(false);
});

test('time range doesn\'t includes later date', () => {
  const date = new Date(2021, 0, 1);
  const timeRange = timeRangeFromDates(
    new Date(2020, 0, 1),
    new Date(2020, 11, 31, 23, 59),
  );

  expect(doesTimeRangeIncludesDate(date, timeRange)).toBe(false);
});
