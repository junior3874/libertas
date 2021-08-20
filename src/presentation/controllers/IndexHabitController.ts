import { IndexHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { ResponseWithHabitArray } from "./type-defs";

export class IndexHabitController {
  public constructor(private useCase: IndexHabitUseCase) {}

  async handle(): Promise<ResponseWithHabitArray> {
    try {
      const habits = await this.useCase.index();

      return { error: null, habits };
    } catch (err) {
      if (err instanceof NoHabitFoundError) {
        return { error: null, habits: [] };
      }

      return {
        error: {
          instance: err,
          message: "Habits couldn't be loaded",
        },
        habits: null,
      };
    }
  }
}
