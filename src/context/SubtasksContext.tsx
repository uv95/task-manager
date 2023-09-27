import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { ISubtask } from '../utils/data';

interface ISubtasksContext {
  subtasks: ISubtask[] | [];
  setSubtasks: React.Dispatch<React.SetStateAction<ISubtask[] | []>>;

}

export const SubtasksContext = createContext<ISubtasksContext>({
    subtasks: [],
    setSubtasks: () => {},

});

export const SubtasksProvider:FC<PropsWithChildren> = ({ children }) => {
    const [subtasks, setSubtasks] = useState<ISubtask[] | []>([]);
  
    const values = useMemo(
        () => ({
            subtasks,
            setSubtasks,
        }),
        [subtasks]
    )

    return (
        <SubtasksContext.Provider value={values}>
            {children}
        </SubtasksContext.Provider>
    );
};

export const useSubtasksContext = () => useContext(SubtasksContext)