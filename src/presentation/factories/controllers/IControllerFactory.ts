import {
  CreateHabitController,
  IndexHabitController,
  RemoveHabitController,
  ShowHabitController,
  UpdateHabitController,
} from "../../controllers";
import { ILanguage } from "../../languages";

export interface IControllerFactory {
  makeCreateHabitController(language: ILanguage): CreateHabitController;
  makeIndexHabitController(language: ILanguage): IndexHabitController;
  makeRemoveHabitController(): RemoveHabitController;
  makeUpdateHabitController(): UpdateHabitController;
  makeShowHabitController(): ShowHabitController;
}
