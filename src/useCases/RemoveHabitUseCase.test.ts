import { mock } from "jest-mock-extended";
import { NoHabitFoundError } from "./errors";
import { IRemoveHabitRepository, IShowHabitRepository } from "./interfaces";
import { RemoveHabitUseCase } from "./RemoveHabitUseCase";

function makeSut() {
  const showHabitRepositoryMock = mock<IShowHabitRepository>();
  const removeHabitRepositoryMock = mock<IRemoveHabitRepository>();
  const sut = new RemoveHabitUseCase(
    showHabitRepositoryMock,
    removeHabitRepositoryMock
  );

  return { sut, showHabitRepositoryMock, removeHabitRepositoryMock };
}

describe("Remove Habit use-case", () => {
  it("should remove a Habit succesfully", async () => {
    const { sut, showHabitRepositoryMock, removeHabitRepositoryMock } =
      makeSut();
    const createdHabit = {
      name: "Habit to be deleted",
      performedLastDate: new Date(),
    };
    showHabitRepositoryMock.show.mockResolvedValue(createdHabit);

    await sut.remove(createdHabit.name);

    expect(removeHabitRepositoryMock.remove).toHaveBeenCalledTimes(1);
  });

  it("should throw NoHabitFoundError", async () => {
    const { sut, showHabitRepositoryMock } = makeSut();
    showHabitRepositoryMock.show.mockResolvedValue(undefined);

    await expect(sut.remove("My non-existent habit")).rejects.toThrow(
      new NoHabitFoundError()
    );
  });
});
