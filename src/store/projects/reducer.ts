import { IProject, NormalizedData } from "../../utils/data";
import { ProjectsActions } from "./actions";

const initialState = {
    ids: [],
    entities: {}
}

export const projects = (state: NormalizedData<IProject> = initialState, action: {type: ProjectsActions, payload: any}
) => {
    const {type, payload} = action;
    switch (type) {
    case ProjectsActions.ADD_PROJECT: {
        return {
            ids: [...state.ids, payload.id],
            entities: {
                ...state.entities,
                [payload.id] : payload
            }
        };
    }
    case ProjectsActions.UPDATE_PROJECT: {
        return {
            ...state,
            entities: {
                ...state.entities,
                [payload.id]: payload 
            }
        };
    }
    case ProjectsActions.DELETE_PROJECT: {
        const { 
            [payload]: projectToDelete,
            ...filteredProjects
        } = state.entities;

        return {
            ids: state.ids.filter(id => id !== payload),
            entities: filteredProjects
        };
    }
    case ProjectsActions.ADD_TASK_ID: {
        const {taskId, projectId} = payload
        const project = state.entities[projectId]
        return {
            ...state,
            entities: {
                ...state.entities,
                [projectId]: {
                    ...project,
                    tasks: [...project.tasks, taskId]
                }
                
            }
        };
    }
    case ProjectsActions.DELETE_TASK_ID: {
        const {taskId, projectId} = payload
        const project = state.entities[projectId]
        return {
            ...state,
            entities: {
                ...state.entities,
                [projectId]: {
                    ...project,
                    tasks: project.tasks.filter(id => id!==taskId)
                }
                
            }
        };
    }
    default: {
        return state;
    }
    }
};