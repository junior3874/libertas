import { Habit } from "../../entities/Habit";
import { IIndexHabitRepository } from "../../useCases/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { asyncStorageKeys } from "./lib/asyncStorageKeys";

class IndexHabitAsyncStorageRepository implements IIndexHabitRepository {
  async index(): Promise<Habit[]> {
    const habits: Habit[] = JSON.parse(
      (await AsyncStorage.getItem(asyncStorageKeys.habit)) || "[]"
    );

    return habits;
  }
}

export { IndexHabitAsyncStorageRepository };
