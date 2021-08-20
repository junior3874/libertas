import { Habit } from "../../entities/Habit";
import { CreateHabitDTO } from "../DTOs/";
interface ICreateHabitRepository {
  create({ name, performedLastDate }: CreateHabitDTO): Promise<void>;
}

export { ICreateHabitRepository };
