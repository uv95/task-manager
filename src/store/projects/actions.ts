import { IProject } from '../../utils/types'

export enum ProjectsActions {
    ADD_PROJECT = '@@project/ADD_PROJECT',
    UPDATE_PROJECT = '@@project/UPDATE_PROJECT',
    DELETE_PROJECT = '@@project/DELETE_PROJECT',
    ADD_TASK_ID = '@@project/ADD_TASK_ID',
    DELETE_TASK_ID = '@@project/DELETE_TASK_ID'
}

export const addProject = (project:IProject) => ({
    type: ProjectsActions.ADD_PROJECT,
    payload: project
})

export const updateProject = (project:IProject) => ({
    type: ProjectsActions.UPDATE_PROJECT,
    payload: project
})

export const deleteProject = (projectId:string) => ({
    type: ProjectsActions.DELETE_PROJECT,
    payload: projectId
})

export const addTaskId = ({taskId, projectId}:{taskId:string, projectId:string}) => ({
    type: ProjectsActions.ADD_TASK_ID,
    payload: {taskId, projectId}
})

export const deleteTaskId = ({taskId, projectId}:{taskId:string, projectId:string}) => ({
    type: ProjectsActions.DELETE_TASK_ID,
    payload: {taskId, projectId}
})
