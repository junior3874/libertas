import { IFormComponentLanguage } from "./IFormComponentLanguage";

export interface ICreateHabitPageLanguage extends IFormComponentLanguage {
  getCreateHabitPageTitleMessage(): string;
  getCreateHabitPageSubtitleMessage(): string;
  getCreateHabitButtonMessage(): string;
}
