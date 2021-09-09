import { IHabitAlreadyExistsErrorLanguage } from "./IHabitAlreadyExistsErrorLanguage";
import { IMissingParamsErrorLanguage } from "./IMissingParamsErrorLanguage";

export interface ICreateHabitControllerLanguage
  extends IHabitAlreadyExistsErrorLanguage,
    IMissingParamsErrorLanguage {
  getHabitCreatedSuccessfullyMessage(name: string): string;
  getHabitNotCreatedMessage(name: string): string;
}
