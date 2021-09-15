import { IndexHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { IIndexHabitControllerLanguage } from "../languages/interfaces";
import { ResponseWithHabitArray } from "./type-defs";

export class IndexHabitController {
  public constructor(
    private useCase: IndexHabitUseCase,
    private language: IIndexHabitControllerLanguage
  ) {}

  async handle(): Promise<ResponseWithHabitArray> {
    try {
      const habits = await this.useCase.index();

      return {
        message: this.language.getHabitsLoadedSuccessfullyMessage(),
        error: null,
        habits,
      };
    } catch (err) {
      if (err instanceof NoHabitFoundError) {
        return {
          message: this.language.getHabitsLoadedSuccessfullyMessage(),
          error: null,
          habits: [],
        };
      }

      return {
        message: this.language.getHabitsNotLoadedMessage(),
        error: {
          instance: err,
        },
        habits: null,
      };
    }
  }
}
