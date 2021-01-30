import Day from './Day';

export default interface DayOccurrence {
  day: Day
  weight: number
}

export const sortDayOccurrencesChronologically = (a: DayOccurrence, b: DayOccurrence): number => (
  a.day.date.getTime() !== b.day.date.getTime()
    ? a.day.date.getTime() - b.day.date.getTime()
    : b.weight - a.weight
);
