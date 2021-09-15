import { IHabitAlreadyExistsErrorLanguage } from "./IHabitAlreadyExistsErrorLanguage";
import { IMissingParamsErrorLanguage } from "./IMissingParamsErrorLanguage";
import { INewNameIsEqualToOldOneErrorLanguage } from "./INewNameIsEqualToOldOneErrorLanguage";
import { INoHabitFoundErrorLanguage } from "./INoHabitFoundErrorLanguage";

export interface IUpdateHabitControllerLanguage
  extends IMissingParamsErrorLanguage,
    INewNameIsEqualToOldOneErrorLanguage,
    IHabitAlreadyExistsErrorLanguage,
    INoHabitFoundErrorLanguage {
  getHabitUpdatedSuccessfullyMessage(): string;
  getHabitNotUpdatedMessage(): string;
}
