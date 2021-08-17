import { Habit } from "../../../entities/Habit";

export function mapStoredHabitStringToDate(habits: Habit[]) {
  return habits.map((habit: Habit) => {
    habit.performedLastDate = new Date(habit.performedLastDate);
    return habit;
  });
}
