import { UpdateHabitUseCase } from "../../useCases";
import {
  NoHabitFoundError,
  HabitAlreadyExistsError,
} from "../../useCases/errors";
import { ResponseWithHabit } from "./type-defs";
import { UpdateHabitDTO } from "../../useCases/DTOs";
import { MissingParamsError } from "../errors";
import { NewNameIsEqualToOldOneError } from "../errors/NewNameIsEqualToOldOneError";
import { IUpdateHabitControllerLanguage } from "../languages/interfaces";
import { FutureDateError } from "../../entities/errors";

export class UpdateHabitController {
  public constructor(
    private useCase: UpdateHabitUseCase,
    private language: IUpdateHabitControllerLanguage
  ) {}

  async handle({
    currentName,
    newName,
    performedLastDate,
  }: UpdateHabitDTO): Promise<ResponseWithHabit> {
    if (!currentName) {
      const params = [this.language.getCurrentNameParamMessage()];
      const error = new MissingParamsError(params);
      return {
        message: this.language.getMissingParamsErrorMessage(params),
        error: { instance: error },
        habit: null,
      };
    }

    if (!newName && !performedLastDate) {
      const params = [
        this.language.getHabitNameParamMessage(),
        this.language.getPerformedLastDateParamMessage(),
      ];
      const error = new MissingParamsError(params);
      return {
        message: this.language.getMissingParamsErrorMessage(params),
        error: { instance: error },
        habit: null,
      };
    }

    if (currentName === newName) {
      const error = new NewNameIsEqualToOldOneError();
      return {
        message: this.language.getNewNameIsEqualToOldOneErrorMessage(),
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
      return {
        message: this.language.getHabitUpdatedSuccessfullyMessage(),
        error: null,
        habit,
      };
    } catch (err) {
      if (err instanceof NoHabitFoundError) {
        return {
          message: this.language.getNoHabitFoundErrorMessage(),
          error: { instance: err },
          habit: null,
        };
      }

      if (err instanceof HabitAlreadyExistsError) {
        return {
          message: this.language.getHabitAlreadyExistsErrorMessage(newName!),
          error: { instance: err },
          habit: null,
        };
      }

      if (err instanceof FutureDateError) {
        return {
          message: this.language.getFutureDateErrorMessage(performedLastDate!),
          error: { instance: err },
          habit: null,
        };
      }

      return {
        message: this.language.getHabitNotUpdatedMessage(),
        error: {
          instance: err,
        },
        habit: null,
      };
    }
  }
}
