import { ShowHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { ResponseWithHabit } from "./type-defs";

export class ShowHabitController {
  public constructor(private useCase: ShowHabitUseCase) {}

  async handle(name: string): Promise<ResponseWithHabit> {
    try {
      const habit = await this.useCase.show(name);
      return { message: "Habit loaded successfully", error: null, habit };
    } catch (err) {
      if (err instanceof NoHabitFoundError) {
        return { message: err.message, error: { instance: err }, habit: null };
      }

      return {
        message: "Habit couldn't be found",
        error: {
          instance: err,
        },
        habit: null,
      };
    }
  }
}
