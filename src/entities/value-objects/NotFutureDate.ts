import { FutureDateError } from "../errors";

export class NotFutureDate {
  value: Date;

  public constructor(date: Date) {
    const now = new Date();

    if (date.getTime() > now.getTime()) {
      throw new FutureDateError(date);
    }

    this.value = date;
  }
}
