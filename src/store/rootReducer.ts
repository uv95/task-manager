import { combineReducers } from "redux";
import { projects } from "./projects/reducer";
import { tasks } from "./tasks/reducer";
import { comments } from "./comments/reducer";

export const rootReducer = combineReducers({
    projects,
    tasks,
    comments
})