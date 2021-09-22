import { mock } from "jest-mock-extended";
import { UpdateHabitUseCase } from "../../useCases";
import { UpdateHabitDTO } from "../../useCases/DTOs";
import {
  HabitAlreadyExistsError,
  NoHabitFoundError,
} from "../../useCases/errors";
import { IUpdateHabitControllerLanguage } from "../languages/interfaces";
import { ResponseWithHabit } from "./type-defs";
import { UpdateHabitController } from "./UpdateHabitController";

function makeSut() {
  const updateHabitUseCaseMock = mock<UpdateHabitUseCase>();
  const languageMock = mock<IUpdateHabitControllerLanguage>();
  const sut = new UpdateHabitController(updateHabitUseCaseMock, languageMock);

  return { sut, updateHabitUseCaseMock, languageMock };
}

describe("Update Habit controller", () => {
  it("should return ResponseWithHabit without error", async () => {
    const { sut, updateHabitUseCaseMock } = makeSut();
    const habit = { name: "My habit", performedLastDate: new Date() };
    updateHabitUseCaseMock.update.mockResolvedValueOnce(habit);

    const response: ResponseWithHabit = await sut.handle({
      currentName: "My habit",
      newName: "My updated habit name",
    });

    expect(response.habit!).toBe(habit);
  });

  it("should return ResponseWithHabit with a generic error message", async () => {
    const { sut, updateHabitUseCaseMock, languageMock } = makeSut();
    updateHabitUseCaseMock.update.mockImplementationOnce(() => {
      throw new Error("Server side error occurred");
    });
    languageMock.getHabitNotUpdatedMessage.mockReturnValue(
      "mocked not updated err msg"
    );

    const response: ResponseWithHabit = await sut.handle({
      currentName: "No-habit",
      newName: "Testing",
      performedLastDate: new Date(),
    });

    expect(response.message).toBe(languageMock.getHabitNotUpdatedMessage());
  });

  it("should return ResponseWithHabit with HabitNotFoundError", async () => {
    const { sut, updateHabitUseCaseMock, languageMock } = makeSut();
    updateHabitUseCaseMock.update.mockImplementationOnce(() => {
      throw new NoHabitFoundError();
    });
    languageMock.getNoHabitFoundErrorMessage.mockReturnValue(
      "mocked not found err msg"
    );

    const response: ResponseWithHabit = await sut.handle({
      currentName: "No-habit",
      newName: "New-Name",
      performedLastDate: new Date(),
    });

    expect(response.message).toEqual(
      languageMock.getNoHabitFoundErrorMessage()
    );
  });

  it("should return ResponseWithHabit with HabitAlreadyExistError", async () => {
    const { sut, updateHabitUseCaseMock, languageMock } = makeSut();
    updateHabitUseCaseMock.update.mockImplementationOnce(() => {
      throw new HabitAlreadyExistsError("Testing");
    });
    languageMock.getHabitAlreadyExistsErrorMessage.mockReturnValue(
      "mocked already exists err msg"
    );

    const response: ResponseWithHabit = await sut.handle({
      currentName: "No-habit",
      newName: "Testing",
      performedLastDate: new Date(),
    });

    expect(response.message).toEqual(
      languageMock.getHabitAlreadyExistsErrorMessage("Testing")
    );
  });

  it("should return ResponseWithHabit with NewNameIsEqualToOldOneError", async () => {
    const { sut, updateHabitUseCaseMock, languageMock } = makeSut();
    const oldHabit = { name: "My habit", performedLastDate: new Date() };
    const newUpdatedHabit: UpdateHabitDTO = {
      currentName: oldHabit.name,
      newName: oldHabit.name,
    };
    updateHabitUseCaseMock.update.mockResolvedValueOnce(oldHabit);
    languageMock.getNewNameIsEqualToOldOneErrorMessage.mockReturnValue(
      "mocked name is equal err msg"
    );

    const response: ResponseWithHabit = await sut.handle(newUpdatedHabit);

    expect(response.message).toEqual(
      languageMock.getNewNameIsEqualToOldOneErrorMessage()
    );
  });

  it("should return ResponseWithHabit with MissingParamsError", async () => {
    const { sut, updateHabitUseCaseMock, languageMock } = makeSut();
    const oldHabit = { name: "My habit", performedLastDate: new Date() };
    const newUpdatedHabit = {
      newName: "My updated habit name",
    };
    updateHabitUseCaseMock.update.mockResolvedValueOnce(oldHabit);
    languageMock.getMissingParamsErrorMessage.mockImplementation(
      (params) => `mocked missing ${params} err msg`
    );
    languageMock.getCurrentNameParamMessage.mockReturnValue("current name");

    const response: ResponseWithHabit = await sut.handle(
      newUpdatedHabit as UpdateHabitDTO
    );

    const expectedMessage = languageMock.getMissingParamsErrorMessage([
      languageMock.getCurrentNameParamMessage(),
    ]);
    expect(response.message).toBe(expectedMessage);
  });

  it("should return ResponseWithHabit with MissingParamsError", async () => {
    const { sut, updateHabitUseCaseMock, languageMock } = makeSut();
    const oldHabit = { name: "My habit", performedLastDate: new Date() };
    const newUpdatedHabit: UpdateHabitDTO = { currentName: oldHabit.name };
    updateHabitUseCaseMock.update.mockResolvedValueOnce(oldHabit);
    languageMock.getMissingParamsErrorMessage.mockImplementation(
      (params) => `mocked missing ${params} err msg`
    );
    languageMock.getHabitNameParamMessage.mockReturnValue("name");
    languageMock.getPerformedLastDateParamMessage.mockReturnValue("date");

    const response: ResponseWithHabit = await sut.handle(newUpdatedHabit);

    const expectedMessage = languageMock.getMissingParamsErrorMessage([
      languageMock.getHabitNameParamMessage(),
      languageMock.getPerformedLastDateParamMessage(),
    ]);
    expect(response.message).toBe(expectedMessage);
  });
});
