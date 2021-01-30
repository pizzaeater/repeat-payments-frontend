import Repeatable, { repeatablesToFindNextDay, repeatableToDaysInTimeRange, repeatableToDaysInYear, validateRepeatable } from '../models/Repeatable';
import { timeRangeFromDates } from '../models/TimeRange';
import Day from '../models/Day';

test('validate times per year', () => {
  [1, 2, 3, 4, 6, 12]
    .forEach((timesPerYear) => {
      validateRepeatable({
        timesPerYear,
        startMonthInYear: 1,
        daySinceMonthStart: 1,
      });
    });
});

test('validate incorrect times per year', () => {
  [-1, 0, 5, 7, 8, 9, 10, 11, 13, 100]
    .forEach((timesPerYear) => {
      expect(() => {
        validateRepeatable({
          timesPerYear,
          startMonthInYear: 1,
          daySinceMonthStart: 1,
        });
      }).toThrow(Error);
    });
});

test('validate start month in year', () => {
  validateRepeatable({
    timesPerYear: 12,
    startMonthInYear: 1,
    daySinceMonthStart: 1,
  });

  [1, 2]
    .forEach((startMonthInYear) => {
      validateRepeatable({
        timesPerYear: 6,
        startMonthInYear,
        daySinceMonthStart: 1,
      });
    });

  [1, 2, 3]
    .forEach((startMonthInYear) => {
      validateRepeatable({
        timesPerYear: 4,
        startMonthInYear,
        daySinceMonthStart: 1,
      });
    });

  [1, 2, 3, 4]
    .forEach((startMonthInYear) => {
      validateRepeatable({
        timesPerYear: 3,
        startMonthInYear,
        daySinceMonthStart: 1,
      });
    });

  [1, 2, 3, 4, 5, 6]
    .forEach((startMonthInYear) => {
      validateRepeatable({
        timesPerYear: 2,
        startMonthInYear,
        daySinceMonthStart: 1,
      });
    });

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .forEach((startMonthInYear) => {
      validateRepeatable({
        timesPerYear: 1,
        startMonthInYear,
        daySinceMonthStart: 1,
      });
    });
});

test('validate incorrect start month in year', () => {
  [-1, 0, 2, 3, 5, 10, 100]
    .forEach((startMonthInYear) => {
      expect(() => {
        validateRepeatable({
          timesPerYear: 12,
          startMonthInYear,
          daySinceMonthStart: 1,
        });
      }).toThrow(Error);
    });

  [-1, 0, 3, 5, 10, 100]
    .forEach((startMonthInYear) => {
      expect(() => {
        validateRepeatable({
          timesPerYear: 6,
          startMonthInYear,
          daySinceMonthStart: 1,
        });
      }).toThrow(Error);
    });

  [-1, 0, 4, 5, 10, 100]
    .forEach((startMonthInYear) => {
      expect(() => {
        validateRepeatable({
          timesPerYear: 4,
          startMonthInYear,
          daySinceMonthStart: 1,
        });
      }).toThrow(Error);
    });

  [-1, 0, 5, 10, 100]
    .forEach((startMonthInYear) => {
      expect(() => {
        validateRepeatable({
          timesPerYear: 3,
          startMonthInYear,
          daySinceMonthStart: 1,
        });
      }).toThrow(Error);
    });

  [-1, 0, 7, 10, 100]
    .forEach((startMonthInYear) => {
      expect(() => {
        validateRepeatable({
          timesPerYear: 2,
          startMonthInYear,
          daySinceMonthStart: 1,
        });
      }).toThrow(Error);
    });

  [-1, 0, 13, 100]
    .forEach((startMonthInYear) => {
      expect(() => {
        validateRepeatable({
          timesPerYear: 1,
          startMonthInYear,
          daySinceMonthStart: 1,
        });
      }).toThrow(Error);
    });
});

test('monthly to days in year', () => {
  const repeatable: Repeatable = {
    timesPerYear: 12,
    startMonthInYear: 1,
    daySinceMonthStart: 15,
  };

  const days = repeatableToDaysInYear(repeatable, 2021);
  expect(days.length).toBe(12);

  days.forEach(({ date }, i) => {
    expect(date.getFullYear()).toBe(2021);
    expect(date.getMonth()).toBe(i);
    expect(date.getDate()).toBe(15);
  });
});

test('quarterly to days in year', () => {
  const repeatable: Repeatable = {
    timesPerYear: 4,
    startMonthInYear: 3,
    daySinceMonthStart: 15,
  };

  const days = repeatableToDaysInYear(repeatable, 2021);
  expect(days.length).toBe(4);

  days.forEach(({ date }, i) => {
    expect(date.getFullYear()).toBe(2021);
    expect(date.getMonth()).toBe(2 + i * 3);
    expect(date.getDate()).toBe(15);
  });
});

test('yearly to days in year', () => {
  const repeatable: Repeatable = {
    timesPerYear: 1,
    startMonthInYear: 6,
    daySinceMonthStart: 15,
  };

  const days = repeatableToDaysInYear(repeatable, 2021);
  expect(days.length).toBe(1);

  expect(days[0].date.getFullYear()).toBe(2021);
  expect(days[0].date.getMonth()).toBe(5);
  expect(days[0].date.getDate()).toBe(15);
});

test('days in time range', () => {
  const repeatable: Repeatable = {
    timesPerYear: 12,
    startMonthInYear: 1,
    daySinceMonthStart: 15,
  };

  const timeRange = timeRangeFromDates(
    new Date(2020, 5, 10),
    new Date(2022, 5, 20),
  );

  const days = repeatableToDaysInTimeRange(repeatable, timeRange);
  expect(days.length).toBe(25);
  expect(days.filter((day) => day.date.getFullYear() === 2020).length).toBe(7);
  expect(days.filter((day) => day.date.getFullYear() === 2021).length).toBe(12);
  expect(days.filter((day) => day.date.getFullYear() === 2022).length).toBe(6);
});

// TODO repeatablesToDayOccurrencesInTimeRange

// TODO: More tests?
test('find next day from repeatables', () => {
  const yearlyRepeatable: Repeatable = {
    timesPerYear: 1,
    startMonthInYear: 6,
    daySinceMonthStart: 1,
  }; // 1 Jun

  const halfYearlyRepeatable: Repeatable = {
    timesPerYear: 2,
    startMonthInYear: 1,
    daySinceMonthStart: 31,
  }; // 1 Jan, 1 Jul

  const sinceDay = new Day(new Date(2020, 7, 1)); // 1 Aug 2020

  const day = repeatablesToFindNextDay(
    [yearlyRepeatable, halfYearlyRepeatable],
    sinceDay
  );

  expect(day.date.getFullYear()).toBe(2021);
  expect(day.date.getMonth()).toBe(5);
  expect(day.date.getDate()).toBe(1);
});
