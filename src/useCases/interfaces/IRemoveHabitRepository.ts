interface IRemoveHabitRepository {
  remove(name: string): Promise<void>;
}

export { IRemoveHabitRepository };
