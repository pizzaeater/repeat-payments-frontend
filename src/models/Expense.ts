import DayOccurrence from './DayOccurrence';
import Day from './Day';

export default class Expense implements DayOccurrence {
  readonly weight = 2;
  readonly day: Day;
  readonly name: string;
  readonly receiver: string | undefined;
  readonly price: number;
  readonly inactive: boolean;

  constructor(day: Day, name: string, receiver: string | undefined, price: number, inactive: boolean) {
    this.day = day;
    this.name = name;
    this.receiver = receiver;
    this.price = price;
    this.inactive = inactive;
  }
}
