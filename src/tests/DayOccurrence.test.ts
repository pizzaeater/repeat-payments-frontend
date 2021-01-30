import Day from '../models/Day';
import DayOccurrence, { sortDayOccurrencesChronologically } from '../models/DayOccurrence';

test('sort day occurrences', () => {
  const occurrence1: DayOccurrence = {
    day: new Day(new Date(2020, 11, 31)),
    weight: 1,
  };

  const occurrence2: DayOccurrence = {
    day: new Day(new Date(2021, 0, 1)),
    weight: 1,
  };

  const sorted = [occurrence1, occurrence2].sort(sortDayOccurrencesChronologically);
  expect(sorted[0]).toBe(occurrence1);
  expect(sorted[1]).toBe(occurrence2);
});

test('sort day occurrences with the same day and different weights', () => {
  const occurrence1: DayOccurrence = {
    day: new Day(new Date(2021, 0, 1)),
    weight: 2,
  };

  const occurrence2: DayOccurrence = {
    day: new Day(new Date(2021, 0, 1)),
    weight: 1,
  };

  const sorted = [occurrence1, occurrence2].sort(sortDayOccurrencesChronologically);
  expect(sorted[0]).toBe(occurrence1);
  expect(sorted[1]).toBe(occurrence2);
});
