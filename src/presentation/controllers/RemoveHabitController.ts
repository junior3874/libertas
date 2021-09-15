import { RemoveHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { IRemoveHabitControllerLanguage } from "../languages/interfaces";
import { BaseResponse } from "./type-defs";

export class RemoveHabitController {
  public constructor(
    private useCase: RemoveHabitUseCase,
    private language: IRemoveHabitControllerLanguage
  ) {}

  async handle(name: string): Promise<BaseResponse> {
    try {
      await this.useCase.remove(name);

      return {
        message: this.language.getHabitRemovedSuccessfullyMessage(name),
        error: null,
      };
    } catch (err) {
      if (err instanceof NoHabitFoundError) {
        return {
          message: this.language.getNoHabitFoundErrorMessage(),
          error: {
            instance: err,
          },
        };
      }

      return {
        message: this.language.getHabitNotRemovedMessage(name),
        error: { instance: err },
      };
    }
  }
}
