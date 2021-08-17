import { NoHabitFoundError } from "./errors";
import { IRemoveHabitRepository, IShowHabitRepository } from "./interfaces";

export class RemoveHabitUseCase {
  public constructor(
    private showRepository: IShowHabitRepository,
    private removeRepository: IRemoveHabitRepository
  ) {}

  async remove(name: string): Promise<void> {
    const habitExists = await this.showRepository.show(name);
    if (!habitExists) {
      throw new NoHabitFoundError();
    }

    await this.removeRepository.remove(name);
  }
}
