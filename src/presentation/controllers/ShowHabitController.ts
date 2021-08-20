import { ShowHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { ResponseWithHabit } from "./type-defs";

export class ShowHabitController {
  public constructor(private useCase: ShowHabitUseCase) {}

  async handle(name: string): Promise<ResponseWithHabit> {
    try {
      const habit = await this.useCase.show(name);
      return { error: null, habit };
    } catch (err) {
      if (err instanceof NoHabitFoundError) {
        return { error: { instance: err, message: err.message }, habit: null };
      }

      return {
        error: {
          instance: err,
          message: "Habit couldn't be found",
        },
        habit: null,
      };
    }
  }
}
