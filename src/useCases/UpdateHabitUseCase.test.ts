import { mock } from "jest-mock-extended";
import { HabitAlreadyExistsError, NoHabitFoundError } from "./errors";
import { IShowHabitRepository, IUpdateHabitRepository } from "./interfaces";
import { UpdateHabitUseCase } from "./UpdateHabitUseCase";

function makeSut() {
  const updateHabitRepositoryMock = mock<IUpdateHabitRepository>();
  const showHabitRepositoryMock = mock<IShowHabitRepository>();
  const sut = new UpdateHabitUseCase(
    updateHabitRepositoryMock,
    showHabitRepositoryMock
  );

  return { sut, updateHabitRepositoryMock, showHabitRepositoryMock };
}

describe("Update Habit use-case", () => {
  it("should update a Habit successfully", async () => {
    const { sut, updateHabitRepositoryMock, showHabitRepositoryMock } =
      makeSut();
    const createdHabit = { name: "My habit", performedLastDate: new Date() };
    const updateDTO = {
      currentName: "My habit",
      newName: "My habit's new name",
    };
    showHabitRepositoryMock.show.mockImplementation((name: string) => {
      return new Promise((resolve, _) => {
        if (name === createdHabit.name) resolve(createdHabit);
        resolve(undefined);
      });
    });

    await sut.update(updateDTO);

    expect(updateHabitRepositoryMock.update).toHaveBeenNthCalledWith(
      1,
      updateDTO
    );
  });

  it("should throw HabitAlreadyExistsError if new name is already in use", async () => {
    const { sut, showHabitRepositoryMock } = makeSut();
    const firstHabit = { name: "Quit smoking", performedLastDate: new Date() };
    const secondHabit = { name: "Stop smoking", performedLastDate: new Date() };
    const updateDTO = {
      currentName: firstHabit.name,
      newName: secondHabit.name,
    };
    showHabitRepositoryMock.show.mockImplementation((name: string) => {
      return new Promise((resolve, _) => {
        if (name === firstHabit.name) resolve(firstHabit);
        if (name === secondHabit.name) resolve(secondHabit);
        resolve(undefined);
      });
    });

    await expect(sut.update(updateDTO)).rejects.toThrow(
      new HabitAlreadyExistsError(secondHabit.name)
    );
  });

  it("should throw NoHabitFoundError", async () => {
    const { sut, showHabitRepositoryMock } = makeSut();
    const updateDTO = {
      currentName: "My habit",
      newName: "New habit name",
    };
    showHabitRepositoryMock.show.mockResolvedValue(undefined);

    await expect(sut.update(updateDTO)).rejects.toThrow(
      new NoHabitFoundError()
    );
  });
});
