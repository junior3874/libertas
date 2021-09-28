import { Habit } from "../entities/Habit";
import { UpdateHabitDTO } from "./DTOs";
import { HabitAlreadyExistsError, NoHabitFoundError } from "./errors";
import { IShowHabitRepository, IUpdateHabitRepository } from "./interfaces";

export class UpdateHabitUseCase {
  public constructor(
    private updateRepository: IUpdateHabitRepository,
    private showRepository: IShowHabitRepository
  ) {}

  async update({
    currentName,
    newName,
    performedLastDate,
  }: UpdateHabitDTO): Promise<Habit> {
    const existentHabit = await this.showRepository.show(currentName);
    if (!existentHabit) {
      throw new NoHabitFoundError();
    }

    if (newName) {
      const newNameIsAlreadyInUse = await this.showRepository.show(newName);
      if (newNameIsAlreadyInUse) {
        throw new HabitAlreadyExistsError(newName);
      }
    }

    const newHabit = new Habit(
      newName || currentName,
      performedLastDate || existentHabit.performedLastDate
    );
    const updatedHabit = await this.updateRepository.update({
      currentName: existentHabit.name,
      newName: newHabit.name,
      performedLastDate: newHabit.performedLastDate,
    });

    return updatedHabit;
  }
}
