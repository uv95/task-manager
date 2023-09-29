import { CheckIcon } from '@heroicons/react/24/outline';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSubtasksContext } from '../../../../../context/SubtasksContext';
import { updateTask } from '../../../../../store/tasks/actions';
import { ISubtask } from '../../../../../utils/types';
import { Button } from '../../../../elements/Button';
import './Subtask.scss';
    
interface SubtaskProps {
    subtask: ISubtask
    taskId?:string
    cantEdit?: boolean
}
    
export const Subtask = ({ subtask, taskId, cantEdit }: SubtaskProps) => {
    const dispatch = useDispatch();
    const { subtasks, setSubtasks } = useSubtasksContext()

    const onChange =(e:ChangeEvent<HTMLInputElement>) => {
        setSubtasks(prev => (prev.map(s => s.id===subtask.id ? {...s, text: e.target.value} : s)))
    }

    const onDelete = () => setSubtasks(prev => prev.filter(s => s.id !==subtask.id))

    const onToggleIsDone = () => {
        const toggle =(s: ISubtask) => s.id===subtask.id ? {...s, isDone: !subtask.isDone} : s
        if (taskId) dispatch(updateTask({taskId, updatedFields: {subtasks: subtasks.map(toggle)}}))

        setSubtasks(prev => prev.map(toggle)) 
    }

    return (
        <div className="subtask">
            <div className="input">
                {!cantEdit && <Button onClick={onDelete}>✕</Button>}
                <div className={`checkIcon ${subtask.isDone ? 'checkIcon-checked' : ''}`} onClick={onToggleIsDone}>{subtask.isDone && <CheckIcon width={17}/> }</div>

                <input autoFocus={!subtask.text} className={`${cantEdit ? 'isDisabled' : ''}`} disabled={cantEdit} type="text" onChange={onChange} value={subtask.text}/>
                
            </div>
        </div>
    );
};