import { RootState } from "..";
import { IProject } from "../../utils/types";

export const selectProjects = (state:RootState) => state.projects.entities

export const selectCurrentProject = (projectId: string) => (state:RootState) => state.projects.entities[projectId as keyof typeof state.projects.entities] as IProject

export const selectProjectsLength = (state:RootState) => state.projects.ids.length