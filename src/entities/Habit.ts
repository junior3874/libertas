import { NotFutureDate } from "./value-objects";

export class Habit {
  name: string;
  performedLastDate: NotFutureDate;

  public constructor(name: string, performedLastDate: Date) {
    this.name = name;
    this.performedLastDate = new NotFutureDate(performedLastDate);
  }
}
