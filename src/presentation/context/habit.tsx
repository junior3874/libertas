import React, { createContext, useState, useEffect } from "react";
import * as Localization from "expo-localization";

import { AsyncStorageControllerFactoryImpl } from "../factories/controllers/AsyncStorageControllerFactoryImpl";

import { Habit } from "../../entities/Habit";
import { CreateHabitDTO, UpdateHabitDTO } from "../../useCases/DTOs";

import { toasts } from "../utils/toats";
import { useCallback } from "react";
import { BaseResponse } from "../controllers/type-defs";
import { i18n } from "../languages";

const language = i18n.getLanguageByLocale(Localization.locale);

const makeControllers = new AsyncStorageControllerFactoryImpl();
const indexHabitController = makeControllers.makeIndexHabitController();
const createHabitController =
  makeControllers.makeCreateHabitController(language);
const removeHabitController = makeControllers.makeRemoveHabitController();
const updateHabitController = makeControllers.makeUpdateHabitController();
const showHabitController = makeControllers.makeShowHabitController();

type HabitContextProps = {
  habits: Habit[];
  addHabit: (habit: CreateHabitDTO) => Promise<BaseResponse>;
  updateHabit: (data: UpdateHabitDTO) => Promise<BaseResponse>;
  removeHabit: (name: string) => Promise<BaseResponse>;
  showHabit: (name: string) => Promise<Habit>;
};

export const HabitContext = createContext({} as HabitContextProps);

export const HabitProvider: React.FC = ({ children }) => {
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
