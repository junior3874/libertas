import { ILanguage } from "./interfaces";

export class ENUSLanguage implements ILanguage {
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
