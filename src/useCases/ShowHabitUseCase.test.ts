import { mock } from "jest-mock-extended";
import { NoHabitFoundError } from "./errors";
import { IShowHabitRepository } from "./interfaces";
import { ShowHabitUseCase } from "./ShowHabitUseCase";

function makeSut() {
  const showHabitRepositoryMock = mock<IShowHabitRepository>();
  const sut = new ShowHabitUseCase(showHabitRepositoryMock);

  return { sut, showHabitRepositoryMock };
}

describe("Show one Habit use-case", () => {
  it("should return a Habit", async () => {
    const { sut, showHabitRepositoryMock } = makeSut();
    const habit = { name: "My habit", performedLastDate: new Date() };
    showHabitRepositoryMock.show.mockResolvedValue(habit);

    const habitFound = await sut.show(habit.name);

    expect(habitFound!.name).toBe(habit.name);
  });

  it("should throw HabitNotFoundError because Habit doesn't exist", async () => {
    const { sut, showHabitRepositoryMock } = makeSut();
    showHabitRepositoryMock.show.mockResolvedValue(undefined);
    const habitName = "My non-existent habit";

    await expect(sut.show(habitName)).rejects.toThrow(new NoHabitFoundError());
  });
});
