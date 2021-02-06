import DayOccurrence from './DayOccurrence';
import Identifiable from './Identifiable';
import Day from './Day';

export default class Today implements DayOccurrence, Identifiable {
  readonly weight = 3;
  readonly id = 'Today';
  readonly day: Day = new Day(new Date());
}
