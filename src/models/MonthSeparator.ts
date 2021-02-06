import Identifiable from './Identifiable';
import Day from './Day';

export default class MonthSeparator implements Identifiable {
  readonly id: string;
  readonly monthStartDay: Day;

  constructor(monthStartDay: Day) {
    this.id = monthStartDay.date.toUTCString();
    this.monthStartDay = monthStartDay;
  }
}
