import { ITask } from '../../utils/data'

export enum TasksActions {
    ADD_TASK = '@@task/ADD_TASK',
    UPDATE_TASK = '@@task/UPDATE_TASK',
    DELETE_TASK = '@@task/DELETE_TASK',
    DELETE_ALL_PROJECT_TASKS = '@@task/DELETE_ALL_PROJECT_TASKS '
}

export const addTask = (task:ITask) => ({
    type: TasksActions.ADD_TASK,
    payload: task
})

export const updateTask = (task:ITask) => ({
    type: TasksActions.UPDATE_TASK,
    payload: task
})

export const deleteTask = (id:string) => ({
    type: TasksActions.DELETE_TASK,
    payload: id
})

export const deleteAllProjectTasks = (tasksIds:string[]) => ({
    type: TasksActions.DELETE_ALL_PROJECT_TASKS,
    payload: tasksIds
})