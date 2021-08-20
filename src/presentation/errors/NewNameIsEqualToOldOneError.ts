export class NewNameIsEqualToOldOneError extends Error {
  public constructor() {
    const message = "Specified name is equal to current name";
    super(message);
    this.message = message;
  }
}
