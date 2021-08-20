import { mock } from "jest-mock-extended";
import { RemoveHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { RemoveHabitController } from "./RemoveHabitController";

function makeSut() {
  const removeHabitUseCaseMock = mock<RemoveHabitUseCase>();
  const sut = new RemoveHabitController(removeHabitUseCaseMock);

  return { sut, removeHabitUseCaseMock };
}

describe("Remove Habit controller", () => {
  it("should return BaseResponse without an error", async () => {
    const { sut, removeHabitUseCaseMock } = makeSut();
    const habitName = "My habit";

    await sut.handle(habitName);

    expect(removeHabitUseCaseMock.remove).toHaveBeenNthCalledWith(1, habitName);
  });

  it("should return BaseResponse with error.instance being a NoHabitFoundError", async () => {
    const { sut, removeHabitUseCaseMock } = makeSut();
    removeHabitUseCaseMock.remove.mockImplementationOnce(() => {
      throw new NoHabitFoundError();
    });

    const response = await sut.handle("My non-existent habit");

    expect(response.error!.instance).toEqual(new NoHabitFoundError());
  });

  it("should return BaseResponse with a generic error message", async () => {
    const { sut, removeHabitUseCaseMock } = makeSut();
    removeHabitUseCaseMock.remove.mockImplementationOnce(() => {
      throw new Error("Server side error occurred");
    });

    const response = await sut.handle("My non-existent habit");

    expect(response.error!.message).toBe("Habit couldn't be deleted");
  });
});
