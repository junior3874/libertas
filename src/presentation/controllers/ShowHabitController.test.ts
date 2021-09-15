import { mock } from "jest-mock-extended";
import { ShowHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { IShowHabitControllerLanguage } from "../languages/interfaces";
import { ShowHabitController } from "./ShowHabitController";
import { ResponseWithHabit } from "./type-defs";

function makeSut() {
  const showHabitUseCaseMock = mock<ShowHabitUseCase>();
  const languageMock = mock<IShowHabitControllerLanguage>();
  const sut = new ShowHabitController(showHabitUseCaseMock, languageMock);

  return { sut, showHabitUseCaseMock, languageMock };
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
    const { sut, showHabitUseCaseMock, languageMock } = makeSut();
    showHabitUseCaseMock.show.mockImplementationOnce(() => {
      throw new NoHabitFoundError();
    });

    const response: ResponseWithHabit = await sut.handle(
      "My non-existent habit"
    );

    expect(response.message).toEqual(
      languageMock.getNoHabitFoundErrorMessage()
    );
  });

  it("should return ResponseWithHabit with a generic error message", async () => {
    const { sut, showHabitUseCaseMock, languageMock } = makeSut();
    showHabitUseCaseMock.show.mockImplementationOnce(() => {
      throw new Error("Server side error occurred");
    });
    const habitName = "My non-existent habit";

    const response: ResponseWithHabit = await sut.handle(habitName);

    expect(response.message).toBe(
      languageMock.getHabitNotLoadedMessage(habitName)
    );
  });
});
