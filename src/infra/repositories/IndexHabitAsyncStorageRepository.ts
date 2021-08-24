import { Habit } from "../../entities/Habit";
import { IIndexHabitRepository } from "../../useCases/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { asyncStorageKeys } from "./lib/asyncStorageKeys";

class IndexHabitAsyncStorageRepository implements IIndexHabitRepository {
  async index(): Promise<Habit[]> {
    let habits: Habit[] = JSON.parse(
      (await AsyncStorage.getItem(asyncStorageKeys.habit)) || "[]"
    );

    habits = habits.map((h) => ({
      ...h,
      performedLastDate: new Date(h.performedLastDate),
    }));

    return habits;
  }
}

export { IndexHabitAsyncStorageRepository };
