import DayOccurrence from './DayOccurrence';
import Day from './Day';

export default class Expense implements DayOccurrence {
  readonly weight = 2;
  readonly day: Day;
  readonly name: string;
  readonly price: number;
  readonly isAccented: boolean;

  constructor(day: Day, name: string, price: number, isAccented: boolean) {
    this.day = day;
    this.name = name;
    this.price = price;
    this.isAccented = isAccented;
  }
}
