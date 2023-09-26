import { combineReducers } from "redux";
import { projects } from "./projects/reducer";
import { tasks } from "./tasks/reducer";

export const rootReducer = combineReducers({
    projects,
    tasks
})