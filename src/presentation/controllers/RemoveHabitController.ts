import { RemoveHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { BaseResponse } from "./type-defs";

export class RemoveHabitController {
  public constructor(private useCase: RemoveHabitUseCase) {}

  async handle(name: string): Promise<BaseResponse> {
    try {
      await this.useCase.remove(name);

      return { error: null };
    } catch (err) {
      if (err instanceof NoHabitFoundError) {
        return {
          error: {
            instance: err,
            message: err.message,
          },
        };
      }

      return { error: { instance: err, message: "Habit couldn't be deleted" } };
    }
  }
}
