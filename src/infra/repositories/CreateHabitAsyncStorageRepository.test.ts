import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "../../entities/Habit";
import { mapStoredHabitStringToDate } from "./helpers";
import { CreateHabitAsyncStorageRepository } from "./index";
import { asyncStorageKeys } from "./lib/asyncStorageKeys";

const createHabitAsyncStorageRepository =
  new CreateHabitAsyncStorageRepository();

describe("Creating Habit repository async-storage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem(asyncStorageKeys.habit);
  });

  it("should create a new Habit", async () => {
    const habit = { name: "testing", performedLastDate: new Date() };
    await createHabitAsyncStorageRepository.create(habit);

    const storedHabits: Habit[] = JSON.parse(
      (await AsyncStorage.getItem(asyncStorageKeys.habit)) as string
    );
    const result = mapStoredHabitStringToDate(storedHabits);

    expect(result).toStrictEqual([habit]);
  });

  it("should append new Habit to list of previously created Habits", async () => {
    const habits = [
      { name: "testing 1", performedLastDate: new Date() },
      { name: "testing 2", performedLastDate: new Date() },
    ];

    await createHabitAsyncStorageRepository.create(habits[0]);
    await createHabitAsyncStorageRepository.create(habits[1]);

    const storedHabits: Habit[] = JSON.parse(
      (await AsyncStorage.getItem(asyncStorageKeys.habit)) as string
    );
    const result = mapStoredHabitStringToDate(storedHabits);

    expect(result).toStrictEqual(habits);
  });
});
