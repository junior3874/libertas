import { Habit } from "../../../entities/Habit";
import { BaseResponse } from "./BaseResponse";

export type ResponseWithHabit = BaseResponse & {
  habit: Habit | null;
};
