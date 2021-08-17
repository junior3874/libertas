import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "../../entities/Habit";
import { RemoveHabitAsyncStorageRepository } from "./index";
import { asyncStorageKeys } from "./lib/asyncStorageKeys";

const removeHabitAsyncStorageRepository =
  new RemoveHabitAsyncStorageRepository();

describe("Remove Habit repository using async-storage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem(asyncStorageKeys.habit);
  });

  it("should remove a Habit", async () => {
    const habit: Habit[] = [{ name: "testing", performedLastDate: new Date() }];
    await AsyncStorage.setItem(asyncStorageKeys.habit, JSON.stringify(habit));

    await removeHabitAsyncStorageRepository.remove("testing");
    const result = JSON.parse(
      (await AsyncStorage.getItem(asyncStorageKeys.habit)) as string
    );

    expect(result).toStrictEqual([]);
  });
});
