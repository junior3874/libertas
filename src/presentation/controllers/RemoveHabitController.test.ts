import { mock } from "jest-mock-extended";
import { RemoveHabitUseCase } from "../../useCases";
import { NoHabitFoundError } from "../../useCases/errors";
import { IRemoveHabitControllerLanguage } from "../languages/interfaces";
import { RemoveHabitController } from "./RemoveHabitController";

function makeSut() {
  const removeHabitUseCaseMock = mock<RemoveHabitUseCase>();
  const languageMock = mock<IRemoveHabitControllerLanguage>();
  const sut = new RemoveHabitController(removeHabitUseCaseMock, languageMock);

  return { sut, removeHabitUseCaseMock, languageMock };
}

describe("Remove Habit controller", () => {
  it("should return BaseResponse without an error", async () => {
    const { sut, removeHabitUseCaseMock } = makeSut();
    const habitName = "My habit";

    await sut.handle(habitName);

    expect(removeHabitUseCaseMock.remove).toHaveBeenNthCalledWith(1, habitName);
  });

  it("should return BaseResponse with error.instance being a NoHabitFoundError", async () => {
    const { sut, removeHabitUseCaseMock, languageMock } = makeSut();
    removeHabitUseCaseMock.remove.mockImplementationOnce(() => {
      throw new NoHabitFoundError();
    });

    const response = await sut.handle("My non-existent habit");

    expect(response.message).toEqual(
      languageMock.getNoHabitFoundErrorMessage()
    );
  });

  it("should return BaseResponse with a generic error message", async () => {
    const { sut, removeHabitUseCaseMock, languageMock } = makeSut();
    removeHabitUseCaseMock.remove.mockImplementationOnce(() => {
      throw new Error("Server side error occurred");
    });
    const habitName = "My non-existent habit";

    const response = await sut.handle(habitName);

    expect(response.message).toBe(
      languageMock.getHabitNotRemovedMessage(habitName)
    );
  });
});
