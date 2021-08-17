import { Habit } from "../entities/Habit";
import { NoHabitFoundError } from "./errors";
import { IShowHabitRepository } from "./interfaces";

export class ShowHabitUseCase {
  public constructor(private showRepository: IShowHabitRepository) {}

  async show(name: string): Promise<Habit> {
    const habit = await this.showRepository.show(name);

    if (!habit) {
      throw new NoHabitFoundError();
    }

    return habit;
  }
}
