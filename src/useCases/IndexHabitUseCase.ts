import { Habit } from "../entities/Habit";
import { NoHabitFoundError } from "./errors";
import { IIndexHabitRepository } from "./interfaces";

export class IndexHabitUseCase {
  public constructor(private indexRepository: IIndexHabitRepository) {}

  async index(): Promise<Habit[]> {
    const habits = await this.indexRepository.index();

    if (habits.length === 0) {
      throw new NoHabitFoundError();
    }

    return habits;
  }
}
