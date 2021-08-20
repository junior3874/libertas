import { mock } from "jest-mock-extended";
import { UpdateHabitUseCase } from "../../useCases";
import { UpdateHabitDTO } from "../../useCases/DTOs";
import {
  HabitAlreadyExistsError,
  NoHabitFoundError,
} from "../../useCases/errors";
import { NewNameIsEqualToOldOneError } from "../errors";
import { ResponseWithHabit } from "./type-defs";
import { UpdateHabitController } from "./UpdateHabitController";

function makeSut() {
  const updateHabitUseCaseMock = mock<UpdateHabitUseCase>();
  const sut = new UpdateHabitController(updateHabitUseCaseMock);

  return { sut, updateHabitUseCaseMock };
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
    const { sut, updateHabitUseCaseMock } = makeSut();
    updateHabitUseCaseMock.update.mockImplementationOnce(() => {
      throw new Error("Server side error occurred");
    });

    const response: ResponseWithHabit = await sut.handle({
      currentName: "No-habit",
      newName: "Testing",
      performedLastDate: new Date(),
    });

    expect(response.error!.message).toBe("Habit couldn't be updated");
  });

  it("should return ResponseWithHabit with HabitNotFoundError", async () => {
    const { sut, updateHabitUseCaseMock } = makeSut();
    updateHabitUseCaseMock.update.mockImplementationOnce(() => {
      throw new NoHabitFoundError();
    });

    const response: ResponseWithHabit = await sut.handle({
      currentName: "No-habit",
      newName: "New-Name",
      performedLastDate: new Date(),
    });

    expect(response.error!.instance).toEqual(new NoHabitFoundError());
  });

  it("should return ResponseWithHabit with HabitAlreadyExistError", async () => {
    const { sut, updateHabitUseCaseMock } = makeSut();
    updateHabitUseCaseMock.update.mockImplementationOnce(() => {
      throw new HabitAlreadyExistsError("Testing");
    });

    const response: ResponseWithHabit = await sut.handle({
      currentName: "No-habit",
      newName: "Testing",
      performedLastDate: new Date(),
    });

    expect(response.error!.instance).toEqual(
      new HabitAlreadyExistsError("Testing")
    );
  });

  it("should return ResponseWithHabit with NewNameIsEqualToOldOneError", async () => {
    const { sut, updateHabitUseCaseMock } = makeSut();
    const oldHabit = { name: "My habit", performedLastDate: new Date() };
    const newUpdatedHabit: UpdateHabitDTO = {
      currentName: oldHabit.name,
      newName: oldHabit.name,
    };
    updateHabitUseCaseMock.update.mockResolvedValueOnce(oldHabit);

    const response: ResponseWithHabit = await sut.handle(newUpdatedHabit);

    expect(response.error!.instance).toEqual(new NewNameIsEqualToOldOneError());
  });

  it("should return ResponseWithHabit with MissingParamsError", async () => {
    const { sut, updateHabitUseCaseMock } = makeSut();
    const oldHabit = { name: "My habit", performedLastDate: new Date() };
    const newUpdatedHabit = {
      newName: "My updated habit name",
    };
    updateHabitUseCaseMock.update.mockResolvedValueOnce(oldHabit);

    const response: ResponseWithHabit = await sut.handle(
      newUpdatedHabit as UpdateHabitDTO
    );

    expect(response.error!.message).toBe("You need to specify: current name");
  });

  it("should return ResponseWithHabit with MissingParamsError", async () => {
    const { sut, updateHabitUseCaseMock } = makeSut();
    const oldHabit = { name: "My habit", performedLastDate: new Date() };
    const newUpdatedHabit: UpdateHabitDTO = { currentName: oldHabit.name };
    updateHabitUseCaseMock.update.mockResolvedValueOnce(oldHabit);

    const response: ResponseWithHabit = await sut.handle(newUpdatedHabit);

    expect(response.error!.message).toBe("You need to specify: name, date");
  });
});
