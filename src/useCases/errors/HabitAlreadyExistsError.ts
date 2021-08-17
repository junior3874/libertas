export class HabitAlreadyExistsError extends Error {
  public constructor(name: string) {
    const message = `Habit ${name} already exists`;
    super(message);
    this.message = message;
  }
}
