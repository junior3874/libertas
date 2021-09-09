export interface IMissingParamsErrorLanguage {
  getMissingParamsErrorMessage(params: string[]): string;
  getHabitNameParamMessage(): string;
  getPerformedLastDateParamMessage(): string;
  getCurrentNameParamMessage(): string;
}
