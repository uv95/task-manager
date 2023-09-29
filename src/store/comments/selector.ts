import { RootState } from "..";
import { ITask } from "../../utils/types";

export const selectAllComments = (state:RootState) => state.comments.entities
export const selectAllTaskComments = (taskId:string) => (state:RootState) => Object.keys(state.comments.entities).filter(commentId => {
    const task = state.tasks.entities[taskId as keyof typeof state.tasks.entities] as ITask;
    return task.comments.includes(commentId) }
)
