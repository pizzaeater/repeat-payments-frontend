import Day from '../models/Day';

test('day has correct year, month, day', () => {
  const day = new Day(new Date(2021, 0, 1));
  expect(day.date.getFullYear()).toBe(2021);
  expect(day.date.getMonth()).toBe(0);
  expect(day.date.getDate()).toBe(1);
});

test('day has no time', () => {
  const day = new Day(new Date(2021, 0, 1));
  expect(day.date.getHours()).toBe(0);
  expect(day.date.getMinutes()).toBe(0);
  expect(day.date.getSeconds()).toBe(0);
  expect(day.date.getMilliseconds()).toBe(0);
});
