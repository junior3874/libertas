import { Habit } from "../../entities/Habit";
import {
  IIndexHabitRepository,
  IShowHabitRepository,
} from "../../useCases/interfaces";

export class ShowHabitAsyncStorageRepository implements IShowHabitRepository {
  public constructor(private indexRepository: IIndexHabitRepository) {}

  async show(name: string): Promise<Habit | undefined> {
    const habits: Habit[] = await this.indexRepository.index();
    const habit = habits.find((h) => h.name === name);

    return habit;
  }
}
