import {
  CreateHabitUseCase,
  IndexHabitUseCase,
  RemoveHabitUseCase,
  ShowHabitUseCase,
  UpdateHabitUseCase,
} from "../../../useCases";
import {
  CreateHabitController,
  IndexHabitController,
  RemoveHabitController,
  ShowHabitController,
  UpdateHabitController,
} from "../../controllers";
import { ILanguage } from "../../languages";
import {
  AsyncStorageRepositoryFactoryImpl,
  IRepositoryFactory,
} from "../repositories";
import { IControllerFactory } from "./IControllerFactory";

export class AsyncStorageControllerFactoryImpl implements IControllerFactory {
  repositoryFactory: IRepositoryFactory =
    new AsyncStorageRepositoryFactoryImpl();

  makeCreateHabitController(language: ILanguage): CreateHabitController {
    const createHabitRepository =
      this.repositoryFactory.makeCreateHabitRepository();
    const showHabitRepository =
      this.repositoryFactory.makeShowHabitRepository();
    const useCase = new CreateHabitUseCase(
      showHabitRepository,
      createHabitRepository
    );

    return new CreateHabitController(useCase, language);
  }

  makeIndexHabitController(language: ILanguage): IndexHabitController {
    const indexHabitRepository =
      this.repositoryFactory.makeIndexHabitRepository();
    const useCase = new IndexHabitUseCase(indexHabitRepository);

    return new IndexHabitController(useCase, language);
  }

  makeRemoveHabitController(): RemoveHabitController {
    const showHabitRepository =
      this.repositoryFactory.makeShowHabitRepository();
    const removeHabitRepository =
      this.repositoryFactory.makeRemoveHabitRepository();
    const useCase = new RemoveHabitUseCase(
      showHabitRepository,
      removeHabitRepository
    );

    return new RemoveHabitController(useCase);
  }

  makeUpdateHabitController(): UpdateHabitController {
    const showHabitRepository =
      this.repositoryFactory.makeShowHabitRepository();
    const updateHabitRepository =
      this.repositoryFactory.makeUpdateHabitRepository();
    const useCase = new UpdateHabitUseCase(
      updateHabitRepository,
      showHabitRepository
    );

    return new UpdateHabitController(useCase);
  }

  makeShowHabitController(): ShowHabitController {
    const showHabitRepository =
      this.repositoryFactory.makeShowHabitRepository();
    const useCase = new ShowHabitUseCase(showHabitRepository);

    return new ShowHabitController(useCase);
  }
}
