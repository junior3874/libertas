import { CreateHabitUseCase } from "../../useCases";
import { CreateHabitDTO } from "../../useCases/DTOs";
import { HabitAlreadyExistsError } from "../../useCases/errors";
import { ResponseWithHabit } from "./type-defs";
import { MissingParamsError } from "../errors";
export class CreateHabitController {
  public constructor(private useCase: CreateHabitUseCase) {}

  async handle({
    name,
    performedLastDate,
  }: CreateHabitDTO): Promise<ResponseWithHabit> {
    try {
      if (!name) {
        const error = new MissingParamsError(["habit name"]);
        return {
          error: { instance: error, message: error.message },
          habit: null,
        };
      }
      const habit = await this.useCase.create({ name, performedLastDate });

      return { error: null, habit };
    } catch (err) {
      if (err instanceof HabitAlreadyExistsError) {
        return { error: { instance: err, message: err.message }, habit: null };
      }

      return {
        error: { instance: err, message: "Habit couldn't be created" },
        habit: null,
      };
    }
  }
}
