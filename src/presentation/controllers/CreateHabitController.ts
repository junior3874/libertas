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
          message: error.message,
          error: { instance: error },
          habit: null,
        };
      }
      const habit = await this.useCase.create({ name, performedLastDate });

      return { message: "Habit created successfully", error: null, habit };
    } catch (err) {
      if (err instanceof HabitAlreadyExistsError) {
        return { message: err.message, error: { instance: err }, habit: null };
      }

      if (!performedLastDate) {
        const error = new MissingParamsError(["last date"]);
        return {
          message: error.message,
          error: { instance: error },
          habit: null,
        };
      }

      return {
        message: "Habit couldn't be created",
        error: { instance: err },
        habit: null,
      };
    }
  }
}
