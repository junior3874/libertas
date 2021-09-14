import { ILanguage } from "./interfaces";

export class ENUSLanguage implements ILanguage {
  getCreateHabitPageDropdownInputTitlePropMessage(): string {
    return "Select a bad habit";
  }

  getCreateHabitPageDropdownInputMessage(): string {
    return "Which bad habit do you want to quit";
  }

  getCreateHabitPageDateInputTitlePropMessage(): string {
    return "Day / Month / Year";
  }

  getCreateHabitPageDateInputMessage(): string {
    return "Last time when you did this bad habit";
  }

  getCreateHabitPageTitleMessage(): string {
    return "Create new bad habit";
  }

  getCreateHabitPageSubtitleMessage(): string {
    return "Choose one of the bad habits below";
  }

  getCreateHabitButtonMessage(): string {
    return "Create new bad habit";
  }

  getHabitPageTitleMessage(): string {
    return "About your bad habit";
  }

  getHabitPageSubtitleMessage(): string {
    return "How long you have been sober";
  }

  getHabitPageDaysMessage(): string {
    return "Days";
  }

  getHabitPageHoursMessage(): string {
    return "Hours";
  }

  getHabitPageMinutesMessage(): string {
    return "Minutes";
  }

  getHabitPageSecondsMessage(): string {
    return "Seconds";
  }

  getHabitPageResetTimeButtonMessage(): string {
    return "Reset Timer";
  }

  getHomePageTitleMessage(): string {
    return "Welcome";
  }

  getHomePageSubtitleMessage(habitsAmount: number): string {
    return `You have ${habitsAmount} bad habits to let go of`;
  }

  getHabitComponentTitleMessage(habitName: string): string {
    return `You have been free of ${habitName} for`;
  }

  getCurrentNameParamMessage(): string {
    return "current name";
  }

  getHabitUpdatedSuccessfullyMessage(): string {
    return "Bad habit was updated successfully";
  }

  getHabitNotUpdatedMessage(): string {
    return "Couldn't update bad habit";
  }

  getNewNameIsEqualToOldOneErrorMessage(): string {
    return "New name is equal to current name";
  }

  getHabitLoadedSuccessfullyMessage(name: string): string {
    return "Bad habit loaded successfully";
  }

  getHabitNotLoadedMessage(name: string): string {
    return "Bad habit couldn't be loaded";
  }

  getHabitRemovedSuccessfullyMessage(_name: string): string {
    return "Bad habit was removed successfully";
  }

  getHabitNotRemovedMessage(_name: string): string {
    return "Bad habit couldn't be found";
  }

  getNoHabitFoundErrorMessage(): string {
    return "No bad habit was found";
  }

  getHabitsLoadedSuccessfullyMessage(): string {
    return "Bad habits loaded successfully";
  }

  getHabitsNotLoadedMessage(): string {
    return "Bad habits couldn't be loaded";
  }

  getSuccessToastTitle(): string {
    return "Success";
  }

  getErrorToastTitle(): string {
    return "Error";
  }

  getHabitCreatedSuccessfullyMessage(_name: string): string {
    return "Bad habit successfully created";
  }

  getHabitNotCreatedMessage(_name: string): string {
    return "Bad habit couldn't be created";
  }

  getHabitAlreadyExistsErrorMessage(name: string): string {
    return `Bad habit '${name}' already exists`;
  }

  getMissingParamsErrorMessage(params: string[]): string {
    return `You need to specify: ${params.join(", ")}`;
  }

  getHabitNameParamMessage(): string {
    return "name";
  }

  getPerformedLastDateParamMessage(): string {
    return "last date";
  }
}
