import { RootState } from "..";

export const selectAllTasks = (state:RootState) => state.tasks.entities
// export const selectQueuedTasks = (state:RootState) => state.tasks.entities
// export const selectTasksInDevelopment = (state:RootState) => state.tasks.entities
// export const selectDoneTasks = (state:RootState) => state.tasks.entities