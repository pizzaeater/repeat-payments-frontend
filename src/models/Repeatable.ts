import Day from './Day';
import DayOccurrence from './DayOccurrence';
import TimeRange, { doesTimeRangeIncludesDate } from './TimeRange';

export default interface Repeatable {
  timesPerYear: number
  daySinceMonthStart: number
  startMonthInYear: number
}

export const validateRepeatable = (repeatable: Repeatable) => {
  if (12 % repeatable.timesPerYear !== 0) {
    throw new Error(`Field "timesPerYear" (${repeatable.timesPerYear}) should be synced with months.`);
  }

  if (repeatable.startMonthInYear <= 0 || repeatable.startMonthInYear > 12 / repeatable.timesPerYear) {
    throw new Error(`Field "startMonthInYear" (${repeatable.startMonthInYear}) should be the earliest in the year.`);
  }
};

export const repeatableToDaysInYear = (repeatable: Repeatable, year: number): Day[] => {
  validateRepeatable(repeatable);

  const monthsRepeat = 12 / repeatable.timesPerYear;

  return [...Array(repeatable.timesPerYear)]
    .map((_, i): number => repeatable.startMonthInYear + i * monthsRepeat)
    .map((month): Date => new Date(year, month - 1))
    .map((date): Date => new Date(date.setDate(repeatable.daySinceMonthStart)))
    .map((date) => new Day(date));
};

export const repeatableToDaysInTimeRange = (repeatable: Repeatable, timeRange: TimeRange): Day[] => (
  [...Array(timeRange.end.getFullYear() - timeRange.start.getFullYear() + 1)]
    .map((_, i): number => timeRange.start.getFullYear() + i)
    .flatMap((year): Day[] => [...repeatableToDaysInYear(repeatable, year)])
    .filter((day): boolean => doesTimeRangeIncludesDate(day.date, timeRange))
);

// TODO: Cover with tests!
export const repeatablesToDayOccurrencesInTimeRange = <R extends Repeatable, D extends DayOccurrence>(repeatables: R[], timeRange: TimeRange, mapperFn: (repeatable: R, day: Day) => D): D[] => (
  repeatables
    .flatMap((repeatable): D[] => [
      ...repeatableToDaysInTimeRange(repeatable, timeRange)
        .map((day) => mapperFn(repeatable, day))
    ])
);

export const repeatablesToFindNextDay = (repeatables: Repeatable[], sinceDay: Day): Day => (
  [...Array(2)] // Look for 2 years
    .map((_, i): number => sinceDay.date.getFullYear() + i)
    .flatMap((year): Day[] => [...repeatables.flatMap((repeatable) => [...repeatableToDaysInYear(repeatable, year)])])
    .filter((day): boolean => day.date.getTime() >= sinceDay.date.getTime())[0]
);
