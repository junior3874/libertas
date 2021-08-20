export class FutureDateError extends Error {
  public constructor(date: Date) {
    const message = `Date ${date.toString()} is in the future`;
    super(message);
    this.message = message;
  }
}
