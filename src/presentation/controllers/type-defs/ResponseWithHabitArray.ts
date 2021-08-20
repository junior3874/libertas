import { Habit } from "../../../entities/Habit";
import { BaseResponse } from "./BaseResponse";

export type ResponseWithHabitArray = BaseResponse & {
  habits: Habit[] | null;
};
