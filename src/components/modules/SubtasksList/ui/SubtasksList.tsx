import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSubtasksContext } from '../../../../context/SubtasksContext';
import { ISubtask } from '../../../../utils/types';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import { Subtask } from '../../Subtask/ui/Subtask';
import './SubtasksList.scss';
    
interface SubtasksListProps {
    initialSubtasks: ISubtask[]
    taskId?: string,
    cantEdit?: boolean
}
    
export const SubtasksList = ({ initialSubtasks, taskId, cantEdit }: SubtasksListProps) => {
    const { subtasks, setSubtasks } = useSubtasksContext()
    const addNewSubtask = () => setSubtasks(prev => [...prev, {id: uuidv4(), text: '', isDone: false}])

    useEffect(() => {
        if(initialSubtasks.length !== 0) setSubtasks(initialSubtasks)
    }, [])

    return (
        <div className='subtasksList'>
            {subtasks.map((subtask) => (
                <Subtask key={subtask.id} taskId={taskId} subtask={subtask} cantEdit={cantEdit}/>
            )) }
            {!cantEdit && <Button theme={ButtonTheme.OUTLINE} onClick={addNewSubtask}>➕ New Subtask</Button>}
        </div>
    );
};