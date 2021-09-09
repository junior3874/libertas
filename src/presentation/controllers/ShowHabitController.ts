import { ShowHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { IShowHabitControllerLanguage } from "../languages/interfaces";
import { ResponseWithHabit } from "./type-defs";

export class ShowHabitController {
  public constructor(
    private useCase: ShowHabitUseCase,
    private language: IShowHabitControllerLanguage
  ) {}

  async handle(name: string): Promise<ResponseWithHabit> {
    try {
      const habit = await this.useCase.show(name);
      return {
        message: this.language.getHabitLoadedSuccessfullyMessage(name),
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

      return {
        message: this.language.getHabitNotLoadedMessage(name),
        error: {
          instance: err,
        },
        habit: null,
      };
    }
  }
}
