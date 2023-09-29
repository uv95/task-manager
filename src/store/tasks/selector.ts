import { RootState } from "..";
import { IProject } from "../../utils/types";

export const selectAllTasks = (state:RootState) => state.tasks.entities

export const selectProjectTasks = (projectId:string) => (state:RootState) => {
    const project = state.projects.entities[projectId as keyof typeof state.projects.entities] as IProject;
    return Object.values(state.tasks.entities).filter(({id}) => project.tasks.includes(id))
}

export const selectCurrentTask = (taskId:string) => (state:RootState) => state.tasks.entities[taskId as keyof typeof state.tasks.entities]

export const selectTaskIndex = (taskId:string) => (state:RootState) => state.tasks.ids.indexOf(taskId)

export const selectVisibleTasks = (searchInput: string) => (state:RootState) => {
    const { entities } = state.tasks;
    return Object.values(entities).filter((task, index) => (index + 1).toString() === searchInput.trim() || task.title.toLowerCase().indexOf(searchInput.toLowerCase().trim()) >=0)
}
