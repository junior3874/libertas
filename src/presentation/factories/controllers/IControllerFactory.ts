import {
  CreateHabitController,
  IndexHabitController,
  RemoveHabitController,
  ShowHabitController,
  UpdateHabitController,
} from "../../controllers";

export interface IControllerFactory {
  makeCreateHabitController(): CreateHabitController;
  makeIndexHabitController(): IndexHabitController;
  makeRemoveHabitController(): RemoveHabitController;
  makeUpdateHabitController(): UpdateHabitController;
  makeShowHabitController(): ShowHabitController;
}
