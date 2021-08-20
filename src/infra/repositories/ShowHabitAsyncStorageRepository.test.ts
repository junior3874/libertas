import { mock } from "jest-mock-extended";
import { Habit } from "../../entities/Habit";
import { IIndexHabitRepository } from "../../useCases/interfaces";
import { ShowHabitAsyncStorageRepository } from "./ShowHabitAsyncStorageRepository";

function makeSut() {
  const indexHabitRepositoryMock = mock<IIndexHabitRepository>();
  const sut = new ShowHabitAsyncStorageRepository(indexHabitRepositoryMock);

  return { sut, indexHabitRepositoryMock };
}

describe("Show Habit repository using async-storage", () => {
  it("should return a Habit", async () => {
    const { sut, indexHabitRepositoryMock } = makeSut();
    const firstHabit: Habit = {
      name: "My first habit",
      performedLastDate: new Date(),
    };
    const secondHabit: Habit = { ...firstHabit, name: "My second habit" };
    indexHabitRepositoryMock.index.mockResolvedValue([firstHabit, secondHabit]);

    const habitFound = await sut.show(secondHabit.name);

    expect(habitFound!.name).toBe(secondHabit.name);
  });

  it("should return undefined", async () => {
    const { sut, indexHabitRepositoryMock } = makeSut();
    const firstHabit: Habit = {
      name: "My first habit",
      performedLastDate: new Date(),
    };
    const secondHabit: Habit = { ...firstHabit, name: "My second habit" };
    indexHabitRepositoryMock.index.mockResolvedValue([firstHabit, secondHabit]);

    const habitFound = await sut.show("My non-existent habit");

    expect(habitFound).toBe(undefined);
  });
});
