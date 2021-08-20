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
        error: { instance: error, message: error.message },
        habit: null,
      };
    }

    if (!newName && !performedLastDate) {
      const error = new MissingParamsError(["name", "date"]);
      return {
        error: { instance: error, message: error.message },
        habit: null,
      };
    }

    if (currentName === newName) {
      const error = new NewNameIsEqualToOldOneError();
      return {
        error: { instance: error, message: error.message },
        habit: null,
      };
    }

    try {
      const habit = await this.useCase.update({
        currentName,
        newName,
        performedLastDate,
      });
      return { error: null, habit };
    } catch (err) {
      if (
        err instanceof NoHabitFoundError ||
        err instanceof HabitAlreadyExistsError
      ) {
        return { error: { instance: err, message: err.message }, habit: null };
      }

      return {
        error: {
          instance: err,
          message: "Habit couldn't be updated",
        },
        habit: null,
      };
    }
  }
}
