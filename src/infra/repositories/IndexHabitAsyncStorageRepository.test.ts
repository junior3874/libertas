import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "../../entities/Habit";
import { mapStoredHabitStringToDate } from "./helpers";
import { IndexHabitAsyncStorageRepository } from "./index";
import { asyncStorageKeys } from "./lib/asyncStorageKeys";

const indexHabitAsyncStorageRepository = new IndexHabitAsyncStorageRepository();
describe("Index Habits repository using async-storage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem(asyncStorageKeys.habit);
  });

  it("should return Habit[] with one Habit", async () => {
    const habits: Habit[] = [
      { name: "testing", performedLastDate: new Date() },
    ];
    await AsyncStorage.setItem(asyncStorageKeys.habit, JSON.stringify(habits));

    const habitsFound: Habit[] = await indexHabitAsyncStorageRepository.index();
    const result = mapStoredHabitStringToDate(habitsFound);

    expect(result).toStrictEqual(habits);
  });

  it("should return an empty Habit[] array", async () => {
    const habits: Habit[] = [];
    await AsyncStorage.setItem(asyncStorageKeys.habit, JSON.stringify(habits));

    const habitsFound: Habit[] = await indexHabitAsyncStorageRepository.index();
    const result = mapStoredHabitStringToDate(habitsFound);

    expect(result).toStrictEqual(habits);
  });
});
