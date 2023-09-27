import { RootState } from ".";
import { TASK_MANAGER_LOCALSTORAGE } from "../utils/consts";

export const loadState = () => {
    try {
        const savedState = localStorage.getItem(TASK_MANAGER_LOCALSTORAGE);
        if (savedState === null) return undefined;

        return JSON.parse(savedState);
    } catch (error) {
        return undefined;
    }
};

export const saveState = (state: RootState) => {
    try {
        const stateToBeSaved = JSON.stringify(state);

        localStorage.setItem(TASK_MANAGER_LOCALSTORAGE, stateToBeSaved);
    } catch (error) {
        console.log(error);
    }
};
