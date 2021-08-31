import React, { createContext, useState, useEffect } from "react";

import { AsyncStorageControllerFactoryImpl } from "../factories/controllers/AsyncStorageControllerFactoryImpl";

import { Habit } from "../../entities/Habit";
import { CreateHabitDTO, UpdateHabitDTO } from "../../useCases/DTOs";

import { toasts } from "../utils/toats";
import { useCallback } from "react";
import { BaseResponse } from "../controllers/type-defs";

const makeControllers = new AsyncStorageControllerFactoryImpl();
const indexHabitController = makeControllers.makeIndexHabitController();
const createHabitController = makeControllers.makeCreateHabitController();
const removeHabitController = makeControllers.makeRemoveHabitController();
const updateHabitController = makeControllers.makeUpdateHabitController();
const showHabitController = makeControllers.makeShowHabitController();

type HabitContextProps = {
  habits: Habit[];
  addHabit: (habit: Habit) => Promise<void>;
  updateHabit: (data: UpdateHabitDTO) => Promise<void>;
  removeHabit: (name: string) => Promise<void>;
  showHabit: (name: string) => Promise<Habit>;
};

export const HabitContext = createContext({} as HabitContextProps);

type ResponseError = {
  error: boolean;
  errorMessage: string | null;
};

export const HabitProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<ResponseError>({
    error: false,
    errorMessage: null,
  });
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);

  const indexHabit = useCallback(async () => {
    setLoadingRequest(true);

    const response = await indexHabitController.handle();

    handleError(response);

    if (response.habits) setHabits(response.habits);

    setLoadingRequest(false);
  }, []);

  useEffect(() => {
    indexHabit();
  }, []);

  const addHabit = async (habit: CreateHabitDTO) => {
    setLoadingRequest(true);

    const response = await createHabitController.handle(habit);

    handleError(response);
    showToastMessage(response.message, !response.error);

    if (!response.error) {
      await indexHabit();
    }

    setLoadingRequest(false);
  };

  const updateHabit = async (data: UpdateHabitDTO) => {
    const response = await updateHabitController.handle(data);

    handleError(response);
    showToastMessage(response.message, !response.error);

    if (!response.error) {
      await indexHabit();
    }
  };

  const removeHabit = async (name: string) => {
    const response = await removeHabitController.handle(name);

    handleError(response);
    showToastMessage(response.message, !response.error);

    if (!response.error) {
      await indexHabit();
    }
  };

  const showHabit = useCallback(async (name: string): Promise<Habit> => {
    const response = await showHabitController.handle(name);

    handleError(response);

    return response.habit!;
  }, []);

  function handleError(responseError: BaseResponse): void {
    if (responseError.error) {
      setError({ error: true, errorMessage: responseError.message });
    } else {
      setError({ error: false, errorMessage: null });
    }
  }

  function showToastMessage(message: string, success: boolean) {
    if (success) toasts.showSuccess(message);
    if (!success) toasts.showError(message);
  }

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        removeHabit,
        showHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
