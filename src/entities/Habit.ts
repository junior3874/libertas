import { NotFutureDate } from "./value-objects";

export class Habit {
  name: string;
  performedLastDate: Date;

  public constructor(name: string, performedLastDate: Date) {
    this.name = name;
    this.performedLastDate = new NotFutureDate(performedLastDate).value;
  }
}
