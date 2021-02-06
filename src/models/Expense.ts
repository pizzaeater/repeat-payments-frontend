import DayOccurrence from './DayOccurrence';
import Identifiable from './Identifiable';
import Day from './Day';

export default class Expense implements DayOccurrence, Identifiable {
  readonly weight = 2;
  readonly id: string;
  readonly day: Day;
  readonly name: string;
  readonly receiver: string | undefined;
  readonly price: number;
  readonly inactive: boolean;

  constructor(day: Day, name: string, receiver: string | undefined, price: number, inactive: boolean) {
    this.id = day.date.toUTCString() + name + price.toFixed(2);
    this.day = day;
    this.name = name;
    this.receiver = receiver;
    this.price = price;
    this.inactive = inactive;
  }
}
