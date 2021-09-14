import { IFormComponentLanguage } from "./IFormComponentLanguage";

export interface IUpdateHabitPageLanguage extends IFormComponentLanguage {
  getUpdateHabitPageTitleMessage(): string;
  getUpdateHabitPageSubtitleMessage(): string;
  getUpdateHabitButtonMessage(): string;
  getDeleteHabitButtonMessage(): string;
}
