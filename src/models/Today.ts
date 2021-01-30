import Day from './Day';
import DayOccurrence from './DayOccurrence';

export default class Today implements DayOccurrence {
  readonly weight = 3;
  readonly day: Day = new Day(new Date());
}
