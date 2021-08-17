import { Habit } from "../../entities/Habit";
import { UpdateHabitDTO } from "../DTOs";

interface IUpdateHabitRepository {
  update({ name, performedLastDate }: UpdateHabitDTO): Promise<Habit>;
}

export { IUpdateHabitRepository };
