import { ICreateHabitControllerLanguage } from "./ICreateHabitControllerLanguage";
import { IIndexHabitControllerLanguage } from "./IIndexHabitControllerLanguage";
import { IRemoveHabitControllerLanguage } from "./IRemoveHabitControllerLanguage";
import { IToastLanguage } from "./IToastLanguage";

export interface ILanguage
  extends IToastLanguage,
    ICreateHabitControllerLanguage,
    IIndexHabitControllerLanguage,
    IRemoveHabitControllerLanguage {}
