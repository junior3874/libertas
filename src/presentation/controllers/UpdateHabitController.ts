import { UpdateHabitUseCase } from "../../useCases";
import {
  NoHabitFoundError,
  HabitAlreadyExistsError,
} from "../../useCases/errors";
import { ResponseWithHabit } from "./type-defs";
import { UpdateHabitDTO } from "../../useCases/DTOs";
import { MissingParamsError } from "../errors";
import { NewNameIsEqualToOldOneError } from "../errors/NewNameIsEqualToOldOneError";
export class UpdateHabitController {
  public constructor(private useCase: UpdateHabitUseCase) {}

  async handle({
    currentName,
    newName,
    performedLastDate,
  }: UpdateHabitDTO): Promise<ResponseWithHabit> {
    if (!currentName) {
      const error = new MissingParamsError(["current name"]);
      return {
        message: error.message,
        error: { instance: error },
        habit: null,
      };
    }

    if (!newName && !performedLastDate) {
      const error = new MissingParamsError(["name", "date"]);
      return {
        message: error.message,
        error: { instance: error },
        habit: null,
      };
    }

    if (currentName === newName) {
      const error = new NewNameIsEqualToOldOneError();
      return {
        message: error.message,
        error: { instance: error },
        habit: null,
      };
    }

    try {
      const habit = await this.useCase.update({
        currentName,
        newName,
        performedLastDate,
      });
      return { message: "Habit updated successfully", error: null, habit };
    } catch (err) {
      if (
        err instanceof NoHabitFoundError ||
        err instanceof HabitAlreadyExistsError
      ) {
        return { message: err.message, error: { instance: err }, habit: null };
      }

      return {
        message: "Habit couldn't be updated",
        error: {
          instance: err,
        },
        habit: null,
      };
    }
  }
}
