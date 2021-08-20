import {
  CreateHabitAsyncStorageRepository,
  IndexHabitAsyncStorageRepository,
  RemoveHabitAsyncStorageRepository,
  UpdateHabitAsyncStorageRepository,
} from "../../../infra/repositories";
import { ShowHabitAsyncStorageRepository } from "../../../infra/repositories/ShowHabitAsyncStorageRepository";
import {
  ICreateHabitRepository,
  IIndexHabitRepository,
  IRemoveHabitRepository,
  IUpdateHabitRepository,
  IShowHabitRepository,
} from "../../../useCases/interfaces";
import { IRepositoryFactory } from "./IRepositoryFactory";

export class AsyncStorageRepositoryFactoryImpl implements IRepositoryFactory {
  makeCreateHabitRepository(): ICreateHabitRepository {
    return new CreateHabitAsyncStorageRepository();
  }
  makeIndexHabitRepository(): IIndexHabitRepository {
    return new IndexHabitAsyncStorageRepository();
  }
  makeRemoveHabitRepository(): IRemoveHabitRepository {
    return new RemoveHabitAsyncStorageRepository();
  }
  makeUpdateHabitRepository(): IUpdateHabitRepository {
    return new UpdateHabitAsyncStorageRepository();
  }
  makeShowHabitRepository(): IShowHabitRepository {
    return new ShowHabitAsyncStorageRepository(this.makeIndexHabitRepository());
  }
}
