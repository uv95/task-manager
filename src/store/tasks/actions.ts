import { ITask } from '../../utils/data'

export enum TasksActions {
    ADD_TASK = '@@TASK/ADD_TASK',
    UPDATE_TASK = '@@TASK/UPDATE_TASK',
    DELETE_TASK = '@@TASK/DELETE_TASK',
    DELETE_ALL_PROJECT_TASKS = '@@TASK/DELETE_ALL_PROJECT_TASKS '
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