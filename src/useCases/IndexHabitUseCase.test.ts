import { mock } from "jest-mock-extended";
import { NoHabitFoundError } from "./errors";
import { IndexHabitUseCase } from "./IndexHabitUseCase";
import { IIndexHabitRepository } from "./interfaces";

function makeSut() {
  const indexHabitRepositoryMock = mock<IIndexHabitRepository>();
  const sut = new IndexHabitUseCase(indexHabitRepositoryMock);

  return { sut, indexHabitRepositoryMock };
}

describe("Index Habits use-case", () => {
  it("should return Habit[] with previously created Habits", async () => {
    const { sut, indexHabitRepositoryMock } = makeSut();
    const firstHabit = {
      name: "My first habit",
      performedLastDate: new Date(),
    };
    const secondHabit = { ...firstHabit, name: "My second habit" };
    indexHabitRepositoryMock.index.mockResolvedValue([firstHabit, secondHabit]);

    const habits = await sut.index();

    expect(habits).toContainEqual(secondHabit);
  });

  it("should throw NoHabitFoundError", async () => {
    const { sut, indexHabitRepositoryMock } = makeSut();
    indexHabitRepositoryMock.index.mockResolvedValue([]);

    await expect(sut.index()).rejects.toThrow(new NoHabitFoundError());
  });
});
