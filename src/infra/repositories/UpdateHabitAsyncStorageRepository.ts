import { Habit } from "../../entities/Habit";
import { IUpdateHabitRepository } from "../../useCases/interfaces";
import { UpdateHabitDTO } from "../../useCases/DTOs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { asyncStorageKeys } from "./lib/asyncStorageKeys";

class UpdateHabitAsyncStorageRepository implements IUpdateHabitRepository {
  async update({
    currentName,
    newName,
    performedLastDate,
  }: UpdateHabitDTO): Promise<Habit> {
    let updatedHabit: Habit = { name: "", performedLastDate: new Date() };
    const newHabits: Habit[] = JSON.parse(
      (await AsyncStorage.getItem(asyncStorageKeys.habit)) as string
    ).map((habit: Habit) => {
      if (habit.name === currentName) {
        habit.name = newName || habit.name;
        habit.performedLastDate = performedLastDate || habit.performedLastDate;
        updatedHabit = habit;
      }

      return habit;
    });

    await AsyncStorage.setItem(
      asyncStorageKeys.habit,
      JSON.stringify(newHabits)
    );

    return updatedHabit;
  }
}

export { UpdateHabitAsyncStorageRepository };
