import { ISubtask, ITask } from '../../utils/types'

export enum TasksActions {
    ADD_TASK = '@@task/ADD_TASK',
    UPDATE_TASK = '@@task/UPDATE_TASK',
    DELETE_TASK = '@@task/DELETE_TASK',
    DELETE_ALL_PROJECT_TASKS = '@@task/DELETE_ALL_PROJECT_TASKS ',
    ADD_SUBTASK_ID = '@@task/ADD_SUBTASK_ID',
    DELETE_SUBTASK_ID = '@@task/DELETE_SUBTASK_ID',
    ADD_COMMENT_ID = '@@task/ADD_COMMENT_ID',
    DELETE_COMMENT_ID = '@@task/DELETE_COMMENT_ID',
}

export const addTask = (task:ITask) => ({
    type: TasksActions.ADD_TASK,
    payload: task
})

export const updateTask = ({taskId, updatedFields}:{taskId:string, updatedFields: Partial<ITask>}) => ({
    type: TasksActions.UPDATE_TASK,
    payload: {taskId, updatedFields}
})

export const deleteTask = (id:string) => ({
    type: TasksActions.DELETE_TASK,
    payload: id
})

export const addSubtaskId = ({taskId, subtaskId}:{taskId:string, subtaskId:string}) => ({
    type: TasksActions.ADD_SUBTASK_ID,
    payload: {taskId, subtaskId}
})

export const deleteSubtaskId = ({taskId, subtaskId}:{taskId:string, subtaskId:string}) => ({
    type: TasksActions.DELETE_SUBTASK_ID,
    payload: {taskId, subtaskId}
})

export const addCommentId = ({taskId, commentId}:{taskId:string, commentId:string}) => ({
    type: TasksActions.ADD_COMMENT_ID,
    payload: {taskId, commentId}
})

export const deleteCommentId = ({taskId, commentId}:{taskId:string, commentId:string}) => ({
    type: TasksActions.DELETE_COMMENT_ID,
    payload: {taskId, commentId}
})

export const deleteAllProjectTasks = (tasksIds:string[]) => ({
    type: TasksActions.DELETE_ALL_PROJECT_TASKS,
    payload: tasksIds
})