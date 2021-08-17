import { Habit } from "../entities/Habit";
import { CreateHabitDTO } from "./DTOs";
import { HabitAlreadyExistsError } from "./errors";
import { ICreateHabitRepository, IShowHabitRepository } from "./interfaces";

export class CreateHabitUseCase {
  public constructor(
    private showRepository: IShowHabitRepository,
    private createRepository: ICreateHabitRepository
  ) {}

  async create({ name, performedLastDate }: CreateHabitDTO): Promise<Habit> {
    const habitAlreadyExists = await this.showRepository.show(name);
    if (habitAlreadyExists) {
      throw new HabitAlreadyExistsError(name);
    }

    const habit = new Habit(name, performedLastDate);
    await this.createRepository.create({
      name: habit.name,
      performedLastDate: habit.performedLastDate,
    });

    return habit;
  }
}
