import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "../../entities/Habit";
import { UpdateHabitAsyncStorageRepository } from "./index";
import { asyncStorageKeys } from "./lib/asyncStorageKeys";

const updateHabitAsyncStorageRepository =
  new UpdateHabitAsyncStorageRepository();

describe("Update habit repository using async-storage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem(asyncStorageKeys.habit);
  });

  it("should update a Habit", async () => {
    const staticDate = new Date(2014, 1, 1);
    const currentHabit = [{ name: "testing", performedLastDate: new Date() }];
    const newHabit = { name: "testing", performedLastDate: staticDate };

    await AsyncStorage.setItem(
      asyncStorageKeys.habit,
      JSON.stringify(currentHabit)
    );

    const result = await updateHabitAsyncStorageRepository.update({
      currentName: "testing",
      performedLastDate: staticDate,
    });

    expect(result).toStrictEqual(newHabit);
  });
});
