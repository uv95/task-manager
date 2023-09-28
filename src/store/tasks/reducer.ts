import { deleteAllReplies } from "../../utils/deleteAllReplies";
import { ITask, NormalizedData } from "../../utils/types";
import { TasksActions } from "./actions";

const initialState = {
    ids: [],
    entities: {}
}

export const tasks = (state:NormalizedData<ITask> = initialState, action: { type: TasksActions, payload: any }
) => {
    const {type, payload} = action;
    switch (type) {
    case TasksActions.ADD_TASK: {
        return {
            ids: [...state.ids, payload.id],
            entities: {
                ...state.entities,
                [payload.id] : payload
            }
        };
    }
    case TasksActions.UPDATE_TASK: {
        const task = state.entities[payload.taskId]
        return {
            ...state,
            entities: {
                ...state.entities,
                [payload.taskId]: {
                    ...task,
                    ...payload.updatedFields
                } 
            }
        };
    }
    case TasksActions.DELETE_TASK: {

        const { 
            [payload]: taskToDelete,
            ...filteredTasks
        } = state.entities;

        return {
            ids: state.ids.filter(id => id !== payload),
            entities: filteredTasks
        };
    }
    case TasksActions.DELETE_ALL_PROJECT_TASKS: {
        let filteredTasks = state.entities;
        for (const taskId of payload) {
            const { 
                [taskId]: taskToDelete,
                ...otherTasks
            } = filteredTasks;
            filteredTasks = otherTasks
        }
        return {
            ids: state.ids.filter(id => !payload.includes(id)),
            entities: filteredTasks
        };
    }
    case TasksActions.ADD_SUBTASK_ID: {
        const {taskId, subtaskId} = payload
        const task = state.entities[taskId]
        return {
            ...state,
            entities: {
                ...state.entities,
                [taskId]: {
                    ...task,
                    subtasks: [...task.subtasks, subtaskId]
                }
                
            }
        };
    }
    case TasksActions.DELETE_SUBTASK_ID: {
        const {taskId, subtaskId} = payload
        const task = state.entities[taskId]
        return {
            ...state,
            entities: {
                ...state.entities,
                [taskId]: {
                    ...task,
                    subtasks: task.subtasks.filter(id => id!==subtaskId)
                }
                
            }
        };
    }
    case TasksActions.ADD_COMMENT_ID: {
        const {taskId, commentId} = payload
        const task = state.entities[taskId]
        return {
            ...state,
            entities: {
                ...state.entities,
                [taskId]: {
                    ...task,
                    comments: [...task.comments, commentId]
                }
                
            }
        };
    }
    case TasksActions.DELETE_COMMENT_ID: {
        const {taskId, commentId} = payload
        const task = state.entities[taskId]
        return {
            ...state,
            entities: {
                ...state.entities,
                [taskId]: {
                    ...task,
                    comments: task.comments.filter(id => id!==commentId)
                }
                
            }
        };
    }
    default: {
        return state;
    }
    }
};