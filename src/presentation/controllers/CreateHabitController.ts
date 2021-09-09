import { CreateHabitUseCase } from "../../useCases";
import { CreateHabitDTO } from "../../useCases/DTOs";
import { HabitAlreadyExistsError } from "../../useCases/errors";
import { ResponseWithHabit } from "./type-defs";
import { MissingParamsError } from "../errors";
import { ILanguage } from "../languages";

export class CreateHabitController {
  public constructor(
    private useCase: CreateHabitUseCase,
    private language: ILanguage
  ) {}

  async handle({
    name,
    performedLastDate,
  }: CreateHabitDTO): Promise<ResponseWithHabit> {
    try {
      if (!name) {
        const error = new MissingParamsError([
          this.language.getHabitNameParamMessage(),
        ]);
        return {
          message: this.language.getMissingParamsErrorMessage([
            this.language.getHabitNameParamMessage(),
          ]),
          error: { instance: error },
          habit: null,
        };
      }
      const habit = await this.useCase.create({ name, performedLastDate });

      return {
        message: this.language.getHabitCreatedSuccessfullyMessage(name),
        error: null,
        habit,
      };
    } catch (err) {
      if (err instanceof HabitAlreadyExistsError) {
        return {
          message: this.language.getHabitAlreadyExistsErrorMessage(name),
          error: { instance: err },
          habit: null,
        };
      }

      if (!performedLastDate) {
        const error = new MissingParamsError([
          this.language.getPerformedLastDateParamMessage(),
        ]);
        return {
          message: this.language.getMissingParamsErrorMessage([
            this.language.getPerformedLastDateParamMessage(),
          ]),
          error: { instance: error },
          habit: null,
        };
      }

      return {
        message: this.language.getHabitNotCreatedMessage(name),
        error: { instance: err },
        habit: null,
      };
    }
  }
}
