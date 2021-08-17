import { CreateHabitUseCase } from "./CreateHabitUseCase";
import { mock } from "jest-mock-extended";
import { ICreateHabitRepository, IShowHabitRepository } from "./interfaces";
import { CreateHabitDTO } from "./DTOs";
import { HabitAlreadyExistsError } from "./errors";

function makeSut() {
  const showHabitRepositoryMock = mock<IShowHabitRepository>();
  const createHabitRepositoryMock = mock<ICreateHabitRepository>();
  const sut = new CreateHabitUseCase(
    showHabitRepositoryMock,
    createHabitRepositoryMock
  );

  return { sut, showHabitRepositoryMock, createHabitRepositoryMock };
}

describe("Habit creation use-case", () => {
  it("should be able to create a Habit", async () => {
    const { sut, showHabitRepositoryMock } = makeSut();

    showHabitRepositoryMock.show.mockResolvedValue(undefined);

    const habit: CreateHabitDTO = {
      name: "Quit smoking",
      performedLastDate: new Date(),
    };
    const createdHabit = await sut.create(habit);

    expect(createdHabit).toEqual(habit);
  });

  it("should NOT be able to create a duplicate Habit", async () => {
    const { sut, showHabitRepositoryMock } = makeSut();

    const habit: CreateHabitDTO = {
      name: "Quit smoking",
      performedLastDate: new Date(),
    };

    showHabitRepositoryMock.show.mockResolvedValue(habit);

    await expect(sut.create(habit)).rejects.toThrow(
      new HabitAlreadyExistsError(habit.name)
    );
  });
});
