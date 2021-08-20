import { Habit } from "../../entities/Habit";

interface IIndexHabitRepository {
  index(): Promise<Habit[]>;
}

export { IIndexHabitRepository };
