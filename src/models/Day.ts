// TODO: To interface???
export default class Day {
  readonly date: Date;

  constructor(date: Date) {
    this.date = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
  }
}

export const dayToString = (day: Day): string => day.date.toLocaleString();
