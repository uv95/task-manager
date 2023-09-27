import { RootState } from "..";

export const selectProjects = (state:RootState) => state.projects.entities
export const selectProjectsLength = (state:RootState) => state.projects.ids.length