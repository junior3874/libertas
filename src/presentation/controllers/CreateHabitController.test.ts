import { mock } from "jest-mock-extended";
import { CreateHabitUseCase } from "../../useCases";
import { CreateHabitDTO } from "../../useCases/DTOs";
import { HabitAlreadyExistsError } from "../../useCases/errors";
import { CreateHabitController } from "./CreateHabitController";

function makeSut() {
  const createHabitUseCaseMock = mock<CreateHabitUseCase>();
  const sut = new CreateHabitController(createHabitUseCaseMock);

  return { sut, createHabitUseCaseMock };
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
    const { sut, createHabitUseCaseMock } = makeSut();
    const newHabit: CreateHabitDTO = {
      name: "My new habit",
      performedLastDate: new Date(),
    };
    const errorThrown = new HabitAlreadyExistsError(newHabit.name);
    createHabitUseCaseMock.create.mockImplementationOnce(() => {
      throw errorThrown;
    });

    const response = await sut.handle(newHabit);

    expect(response.error!.instance).toBe(errorThrown);
  });

  it("should return ResponseWithHabit with a generic error message", async () => {
    const { sut, createHabitUseCaseMock } = makeSut();
    const newHabit: CreateHabitDTO = {
      name: "My new habit",
      performedLastDate: new Date(),
    };
    const errorThrown = new Error("Server side error occurred");
    createHabitUseCaseMock.create.mockImplementationOnce(() => {
      throw errorThrown;
    });

    const response = await sut.handle(newHabit);

    expect(response.error!.message).toBe("Habit couldn't be created");
  });
});
