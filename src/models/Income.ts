import DayOccurrence from './DayOccurrence';
import Day from './Day';

export default class Income implements DayOccurrence {
  readonly weight = 1;
  readonly day: Day;
  readonly name: string;
  readonly sender: string | undefined;
  readonly inactive: boolean;

  constructor(day: Day, name: string, sender: string | undefined, inactive: boolean) {
    this.day = day;
    this.name = name;
    this.sender = sender;
    this.inactive = inactive;
  }
}
