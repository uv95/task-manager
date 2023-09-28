import { RootState } from "..";

export const selectAllTasks = (state:RootState) => state.tasks.entities
