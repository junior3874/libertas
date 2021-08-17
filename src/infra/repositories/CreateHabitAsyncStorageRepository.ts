import { ICreateHabitRepository } from "../../useCases/interfaces";
import { CreateHabitDTO } from "../../useCases/DTOs";
import { Habit } from "../../entities/Habit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { asyncStorageKeys } from "./lib/asyncStorageKeys";

class CreateHabitAsyncStorageRepository implements ICreateHabitRepository {
  async create({ name, performedLastDate }: CreateHabitDTO): Promise<void> {
    const habit = { name, performedLastDate };
    const gettingOldHabits = JSON.parse(
      (await AsyncStorage.getItem(asyncStorageKeys.habit)) || "[]"
    );

    gettingOldHabits.push(habit);
    await AsyncStorage.setItem(
      asyncStorageKeys.habit,
      JSON.stringify(gettingOldHabits)
    );
  }
}

export { CreateHabitAsyncStorageRepository };
