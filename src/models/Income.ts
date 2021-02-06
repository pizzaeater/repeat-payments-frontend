import DayOccurrence from './DayOccurrence';
import Identifiable from './Identifiable';
import Day from './Day';

export default class Income implements DayOccurrence, Identifiable {
  readonly weight = 1;
  readonly id: string;
  readonly day: Day;
  readonly name: string;
  readonly sender: string | undefined;
  readonly inactive: boolean;

  constructor(day: Day, name: string, sender: string | undefined, inactive: boolean) {
    this.id = day.date.toUTCString() + name;
    this.day = day;
    this.name = name;
    this.sender = sender;
    this.inactive = inactive;
  }
}
