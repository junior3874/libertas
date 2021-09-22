import { IFutureDateErrorLanguage } from "./IFutureDateErrorLanguage";
import { IHabitAlreadyExistsErrorLanguage } from "./IHabitAlreadyExistsErrorLanguage";
import { IMissingParamsErrorLanguage } from "./IMissingParamsErrorLanguage";

export interface ICreateHabitControllerLanguage
  extends IHabitAlreadyExistsErrorLanguage,
    IMissingParamsErrorLanguage,
    IFutureDateErrorLanguage {
  getHabitCreatedSuccessfullyMessage(name: string): string;
  getHabitNotCreatedMessage(name: string): string;
}
