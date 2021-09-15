import React, { createContext, useState, useEffect, useContext } from "react";

import { AsyncStorageControllerFactoryImpl } from "../factories/controllers/AsyncStorageControllerFactoryImpl";

import { Habit } from "../../entities/Habit";
import { CreateHabitDTO, UpdateHabitDTO } from "../../useCases/DTOs";

import { toasts } from "../utils/toats";
import { useCallback } from "react";
import { BaseResponse } from "../controllers/type-defs";
import { LanguageContext } from "./language";

const makeControllers = new AsyncStorageControllerFactoryImpl();

type HabitContextProps = {
  habits: Habit[];
  addHabit: (habit: CreateHabitDTO) => Promise<BaseResponse>;
  updateHabit: (data: UpdateHabitDTO) => Promise<BaseResponse>;
  removeHabit: (name: string) => Promise<BaseResponse>;
  showHabit: (name: string) => Promise<Habit>;
};

export const HabitContext = createContext({} as HabitContextProps);

export const HabitProvider: React.FC = ({ children }) => {
  const { language } = useContext(LanguageContext);

  const indexHabitController =
    makeControllers.makeIndexHabitController(language);
  const createHabitController =
    makeControllers.makeCreateHabitController(language);
  const removeHabitController =
    makeControllers.makeRemoveHabitController(language);
  const updateHabitController =
    makeControllers.makeUpdateHabitController(language);
  const showHabitController = makeControllers.makeShowHabitController(language);

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);

  const indexHabit = useCallback(async () => {
    setLoadingRequest(true);

    const response = await indexHabitController.handle();

    if (response.habits) setHabits(response.habits);

    setLoadingRequest(false);
  }, []);

  useEffect(() => {
    indexHabit();
  }, []);

  const addHabit = async (habit: CreateHabitDTO) => {
    setLoadingRequest(true);

    const response = await createHabitController.handle(habit);
    showToastMessage(response.message, !response.error);

    if (!response.error) {
      await indexHabit();
    }
    setLoadingRequest(false);

    return response;
  };

  const updateHabit = async (data: UpdateHabitDTO) => {
    const response = await updateHabitController.handle(data);

    showToastMessage(response.message, !response.error);

    if (!response.error) {
      await indexHabit();
    }

    return response;
  };

  const removeHabit = async (name: string) => {
    const response = await removeHabitController.handle(name);

    showToastMessage(response.message, !response.error);

    if (!response.error) {
      await indexHabit();
    }

    return response;
  };

  const showHabit = useCallback(async (name: string): Promise<Habit> => {
    const response = await showHabitController.handle(name);

    return response.habit!;
  }, []);

  function showToastMessage(message: string, success: boolean) {
    if (success) toasts.showSuccess(language.getSuccessToastTitle(), message);
    if (!success) toasts.showError(language.getErrorToastTitle(), message);
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
