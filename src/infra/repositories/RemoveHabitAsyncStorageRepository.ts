import { Habit } from "../../entities/Habit";
import { IRemoveHabitRepository } from "../../useCases/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { asyncStorageKeys } from "./lib/asyncStorageKeys";

class RemoveHabitAsyncStorageRepository implements IRemoveHabitRepository {
  async remove(name: string): Promise<void> {
    const removedHabit = JSON.parse(
      (await AsyncStorage.getItem(asyncStorageKeys.habit)) as string
    ).filter((habit: Habit) => habit.name != name);

    await AsyncStorage.setItem(
      asyncStorageKeys.habit,
      JSON.stringify(removedHabit)
    );
  }
}

export { RemoveHabitAsyncStorageRepository };
