export class MissingParamsError extends Error {
  public constructor(params: string[]) {
    const message = `You need to specify: ${params.join(", ")}`;
    super(message);
    this.message = message;
  }
}
