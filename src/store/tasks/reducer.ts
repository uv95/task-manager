import { ITask, NormalizedData } from "../../utils/data";
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
        return {
            ...state,
            entities: {
                ...state.entities,
                [payload.id]: payload 
            }
        };
    }
    case TasksActions.DELETE_TASK: {

        const { 
            [payload.id]: taskToDelete,
            ...filteredTasks
        } = state.entities;

        console.log(state)
        console.log(filteredTasks)
        return {
            ids: state.ids.filter(id => id! == payload.id),
            entities: filteredTasks
        };
    }
    case TasksActions.DELETE_ALL_PROJECT_TASKS: {
        let filteredTasks = state.entities;
        for (const taskId in payload.tasksIds) {
            const { 
                [taskId]: taskToDelete,
                ...otherTasks
            } = filteredTasks;
            filteredTasks = otherTasks
        }
        return {
            ids: state.ids.filter(id => !payload.tasksIds.includes(id)),
            entities: filteredTasks
        };
    }
    default: {
        return state;
    }
    }
};