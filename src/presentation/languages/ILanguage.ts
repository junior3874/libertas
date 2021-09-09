export interface ILanguage {
  getSuccessToastTitle(): string;
  getErrorToastTitle(): string;
  getHabitCreatedSuccessfullyMessage(name: string): string;
  getHabitNotCreatedMessage(name: string): string;
  getHabitAlreadyExistsErrorMessage(name: string): string;
  getMissingParamsErrorMessage(params: string[]): string;
  getHabitNameParamMessage(): string;
  getPerformedLastDateParamMessage(): string;
}
