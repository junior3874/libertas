import { INoHabitFoundErrorLanguage } from "./INoHabitFoundErrorLanguage";

export interface IShowHabitControllerLanguage
  extends INoHabitFoundErrorLanguage {
  getHabitLoadedSuccessfullyMessage(name: string): string;
  getHabitNotLoadedMessage(name: string): string;
}
