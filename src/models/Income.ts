import DayOccurrence from './DayOccurrence';
import Day from './Day';

export default class Income implements DayOccurrence {
  readonly weight = 1;
  readonly day: Day;
  readonly name: string;

  constructor(day: Day, name: string) {
    this.day = day;
    this.name = name;
  }
}
