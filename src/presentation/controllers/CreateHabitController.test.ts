import { mock } from "jest-mock-extended";
import { CreateHabitUseCase } from "../../useCases";
import { CreateHabitDTO } from "../../useCases/DTOs";
import { HabitAlreadyExistsError } from "../../useCases/errors";
import { ICreateHabitControllerLanguage } from "../languages/interfaces";
import { CreateHabitController } from "./CreateHabitController";
import { ResponseWithHabit } from "./type-defs";

function makeSut() {
  const createHabitUseCaseMock = mock<CreateHabitUseCase>();
  const languageMock = mock<ICreateHabitControllerLanguage>();
  const sut = new CreateHabitController(createHabitUseCaseMock, languageMock);

  return { sut, createHabitUseCaseMock, languageMock };
}

describe("Create Habit controller", () => {
  it("should return ResponseWithHabit without error", async () => {
    const { sut, createHabitUseCaseMock } = makeSut();
    const newHabit: CreateHabitDTO = {
      name: "My new habit",
      performedLastDate: new Date(),
    };
    createHabitUseCaseMock.create.mockResolvedValueOnce(newHabit);

    const response = await sut.handle(newHabit);

    expect(response.habit!.name).toBe(newHabit.name);
  });

  it("should return ResponseWithHabit with error.instance being a HabitAlreadyExistsError", async () => {
    const { sut, createHabitUseCaseMock, languageMock } = makeSut();
    const newHabit: CreateHabitDTO = {
      name: "My new habit",
      performedLastDate: new Date(),
    };
    createHabitUseCaseMock.create.mockImplementationOnce(() => {
      throw new HabitAlreadyExistsError(newHabit.name);
    });
    languageMock.getHabitAlreadyExistsErrorMessage.mockReturnValue(
      "mocked already exists err msg"
    );

    const response = await sut.handle(newHabit);

    expect(response.message).toBe(
      languageMock.getHabitAlreadyExistsErrorMessage(newHabit.name)
    );
  });

  it("should return ResponseWithHabit with a generic error message", async () => {
    const { sut, createHabitUseCaseMock, languageMock } = makeSut();
    const newHabit: CreateHabitDTO = {
      name: "My new habit",
      performedLastDate: new Date(),
    };
    const errorThrown = new Error("Server side error occurred");
    createHabitUseCaseMock.create.mockImplementationOnce(() => {
      throw errorThrown;
    });
    languageMock.getHabitNotCreatedMessage.mockReturnValue(
      "mocked not created err msg"
    );

    const response = await sut.handle(newHabit);

    expect(response.message).toBe(
      languageMock.getHabitNotCreatedMessage(newHabit.name)
    );
  });

  it("should return ResponseWithHabit with MissingParamsError", async () => {
    const { sut, createHabitUseCaseMock, languageMock } = makeSut();
    const habitToBeCreated = { name: "", performedLastDate: new Date() };
    createHabitUseCaseMock.create.mockResolvedValueOnce(habitToBeCreated);
    languageMock.getMissingParamsErrorMessage.mockImplementation(
      (params) => `mocked ${params} err msg`
    );
    languageMock.getHabitNameParamMessage.mockReturnValue("name");

    const response: ResponseWithHabit = await sut.handle(habitToBeCreated);

    expect(response.message).toBe(
      languageMock.getMissingParamsErrorMessage([
        languageMock.getHabitNameParamMessage(),
      ])
    );
  });
});
