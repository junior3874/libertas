import { INoHabitFoundErrorLanguage } from "./INoHabitFoundErrorLanguage";

export interface IRemoveHabitControllerLanguage
  extends INoHabitFoundErrorLanguage {
  getHabitRemovedSuccessfullyMessage(name: string): string;
  getHabitNotRemovedMessage(name: string): string;
}
