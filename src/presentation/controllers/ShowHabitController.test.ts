import { mock } from "jest-mock-extended";
import { ShowHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { ShowHabitController } from "./ShowHabitController";
import { ResponseWithHabit } from "./type-defs";

function makeSut() {
  const showHabitUseCaseMock = mock<ShowHabitUseCase>();
  const sut = new ShowHabitController(showHabitUseCaseMock);

  return { sut, showHabitUseCaseMock };
}

describe("Show Habit controller", () => {
  it("should return ResponseWithHabit without error", async () => {
    const { sut, showHabitUseCaseMock } = makeSut();
    const habit = { name: "My habit", performedLastDate: new Date() };
    showHabitUseCaseMock.show.mockResolvedValueOnce(habit);

    const response: ResponseWithHabit = await sut.handle(habit.name);

    expect(response.habit!.name).toBe(habit.name);
  });

  it("should return ResponseWithHabit with error.instance being a NoHabitFoundError", async () => {
    const { sut, showHabitUseCaseMock } = makeSut();
    showHabitUseCaseMock.show.mockImplementationOnce(() => {
      throw new NoHabitFoundError();
    });

    const response: ResponseWithHabit = await sut.handle(
      "My non-existent habit"
    );

    expect(response.error!.instance).toEqual(new NoHabitFoundError());
  });

  it("should return ResponseWithHabit with a generic error message", async () => {
    const { sut, showHabitUseCaseMock } = makeSut();
    showHabitUseCaseMock.show.mockImplementationOnce(() => {
      throw new Error("Server side error occurred");
    });

    const response: ResponseWithHabit = await sut.handle(
      "My non-existent habit"
    );

    expect(response.message).toBe("Habit couldn't be found");
  });
});
