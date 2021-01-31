import DayOccurrence from './DayOccurrence';
import Day from './Day';

export default class Income implements DayOccurrence {
  readonly weight = 1;
  readonly day: Day;
  readonly name: string;
  readonly isAccented: boolean;

  constructor(day: Day, name: string, isAccented: boolean) {
    this.day = day;
    this.name = name;
    this.isAccented = isAccented;
  }
}
