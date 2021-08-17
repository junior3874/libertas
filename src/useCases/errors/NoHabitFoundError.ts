export class NoHabitFoundError extends Error {
  public constructor() {
    const message = "No habit was found";
    super(message);
    this.message = message;
  }
}
