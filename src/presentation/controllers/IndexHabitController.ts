import { IndexHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { ResponseWithHabitArray } from "./type-defs";

export class IndexHabitController {
  public constructor(private useCase: IndexHabitUseCase) {}

  async handle(): Promise<ResponseWithHabitArray> {
    try {
      const habits = await this.useCase.index();

      return { message: "Habits loaded successfully", error: null, habits };
    } catch (err) {
      if (err instanceof NoHabitFoundError) {
        return {
          message: "Habits loaded successfully",
          error: null,
          habits: [],
        };
      }

      return {
        message: "Habits couldn't be loaded",
        error: {
          instance: err,
        },
        habits: null,
      };
    }
  }
}
