import { RemoveHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { BaseResponse } from "./type-defs";

export class RemoveHabitController {
  public constructor(private useCase: RemoveHabitUseCase) {}

  async handle(name: string): Promise<BaseResponse> {
    try {
      await this.useCase.remove(name);

      return { message: "Habit removed successfully", error: null };
    } catch (err) {
      if (err instanceof NoHabitFoundError) {
        return {
          message: err.message,
          error: {
            instance: err,
          },
        };
      }

      return { message: "Habit couldn't be deleted", error: { instance: err } };
    }
  }
}
