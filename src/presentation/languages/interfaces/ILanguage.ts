import { ICreateHabitControllerLanguage } from "./ICreateHabitControllerLanguage";
import { IHomePageLanguage } from "./IHomePageLanguage";
import { IIndexHabitControllerLanguage } from "./IIndexHabitControllerLanguage";
import { IRemoveHabitControllerLanguage } from "./IRemoveHabitControllerLanguage";
import { IShowHabitControllerLanguage } from "./IShowHabitControllerLanguage";
import { IToastLanguage } from "./IToastLanguage";
import { IUpdateHabitControllerLanguage } from "./IUpdateHabitControllerLanguage";

export interface ILanguage
  extends IToastLanguage,
    ICreateHabitControllerLanguage,
    IIndexHabitControllerLanguage,
    IRemoveHabitControllerLanguage,
    IShowHabitControllerLanguage,
    IUpdateHabitControllerLanguage,
    IHomePageLanguage {}
