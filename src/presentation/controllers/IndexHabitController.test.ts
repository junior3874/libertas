import { mock } from "jest-mock-extended";
import { IndexHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { IIndexHabitControllerLanguage } from "../languages/interfaces";
import { IndexHabitController } from "./IndexHabitController";

function makeSut() {
  const indexHabitUseCaseMock = mock<IndexHabitUseCase>();
  const languageMock = mock<IIndexHabitControllerLanguage>();
  const sut = new IndexHabitController(indexHabitUseCaseMock, languageMock);

  return { sut, indexHabitUseCaseMock };
}

describe("Index Habit controller", () => {
  it("should return ResponseWithHabitArray without error", async () => {
    const { sut, indexHabitUseCaseMock } = makeSut();
    const firstHabit = {
      name: "My first habit",
      performedLastDate: new Date(),
    };
    const secondHabit = { ...firstHabit, name: "My second habit" };
    indexHabitUseCaseMock.index.mockResolvedValueOnce([
      firstHabit,
      secondHabit,
    ]);

    const response = await sut.handle();

    expect(response.habits).toContain(firstHabit);
  });

  it("should return ResponseWithHabitArray without error and an empty array", async () => {
    const { sut, indexHabitUseCaseMock } = makeSut();
    indexHabitUseCaseMock.index.mockImplementationOnce(() => {
      throw new NoHabitFoundError();
    });

    const response = await sut.handle();

    expect(response.habits!.length).toBe(0);
  });

  it("should return ResponseWithHabitArray with an error", async () => {
    const { sut, indexHabitUseCaseMock } = makeSut();
    const errorThrown = new Error("Server side error");
    indexHabitUseCaseMock.index.mockImplementationOnce(() => {
      throw errorThrown;
    });

    const response = await sut.handle();

    expect(response.error!.instance).toBe(errorThrown);
  });
});
