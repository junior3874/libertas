import { ICreateHabitControllerLanguage } from "./ICreateHabitControllerLanguage";
import { IHabitAlreadyExistsErrorLanguage } from "./IHabitAlreadyExistsErrorLanguage";
import { IIndexHabitControllerLanguage } from "./IIndexHabitControllerLanguage";
import { IMissingParamsErrorLanguage } from "./IMissingParamsErrorLanguage";
import { IToastLanguage } from "./IToastLanguage";

export interface ILanguage
  extends IHabitAlreadyExistsErrorLanguage,
    IMissingParamsErrorLanguage,
    IToastLanguage,
    ICreateHabitControllerLanguage,
    IIndexHabitControllerLanguage {}
