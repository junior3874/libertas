import { Habit } from "../../entities/Habit";

interface IShowHabitRepository {
  show(name: string): Promise<Habit | undefined>;
}

export { IShowHabitRepository };
