import { IHabitComponentLanguage } from "./IHabitComponentLanguage";

export interface IHomePageLanguage extends IHabitComponentLanguage {
  getHomePageTitleMessage(): string;
  getHomePageSubtitleMessage(habitsAmount: number): string;
}
