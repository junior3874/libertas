import {
  ICreateHabitRepository,
  IIndexHabitRepository,
  IRemoveHabitRepository,
  IShowHabitRepository,
  IUpdateHabitRepository,
} from "../../../useCases/interfaces";

export interface IRepositoryFactory {
  makeCreateHabitRepository(): ICreateHabitRepository;
  makeIndexHabitRepository(): IIndexHabitRepository;
  makeRemoveHabitRepository(): IRemoveHabitRepository;
  makeUpdateHabitRepository(): IUpdateHabitRepository;
  makeShowHabitRepository(): IShowHabitRepository;
}
