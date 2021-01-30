import Day from './Day';
import { DAY_MS, WEEK_MS } from '../timeConsts';

export default interface TimeRange {
  start: Date
  end: Date
}

export const timeRangeFromDates = (start: Date, end: Date): TimeRange => (
  {
    start: new Date(start),
    end: new Date(end),
  }
);

export const timeRangeFromDays = (start: Day, end: Day): TimeRange => (
  {
    start: new Date(start.date),
    end: new Date(end.date.getTime() + DAY_MS),
  }
);

export const extendTimeRange = (originTimeRange: TimeRange, weeksBefore: number, weeksAfter: number): TimeRange => (
  {
    start: new Date(originTimeRange.start.getTime() - weeksBefore * WEEK_MS),
    end: new Date(originTimeRange.end.getTime() + weeksAfter * WEEK_MS),
  }
);

export const doesTimeRangeIncludesDate = (date: Date, range: TimeRange): boolean => (
  date.getTime() >= range.start.getTime()
  && date.getTime() < range.end.getTime()
);
