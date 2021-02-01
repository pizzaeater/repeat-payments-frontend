import Day from './Day';

export default class MonthSeparator {
  readonly monthStartDay: Day;

  constructor(monthStartDay: Day) {
    this.monthStartDay = monthStartDay;
  }
}
