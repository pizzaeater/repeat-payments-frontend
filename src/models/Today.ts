import DayOccurrence from './DayOccurrence';
import Day from './Day';

export default class Today implements DayOccurrence {
  readonly weight = 3;
  readonly day: Day = new Day(new Date());
}
