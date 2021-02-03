import DayOccurrence from './DayOccurrence';
import Day from './Day';

export default class Income implements DayOccurrence {
  readonly weight = 1;
  readonly day: Day;
  readonly name: string;
  readonly sender: string | undefined;
  readonly isAccented: boolean;

  constructor(day: Day, name: string, sender: string | undefined, isAccented: boolean) {
    this.day = day;
    this.name = name;
    this.sender = sender;
    this.isAccented = isAccented;
  }
}
