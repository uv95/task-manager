import { Dispatch, SetStateAction } from 'react';
import { ISubtask } from '../../../../utils/data';
import { Subtask } from '../../Subtask/ui/Subtask';
import './SubtasksList.scss';
    
interface SubtasksListProps {
    subtasks: ISubtask[]
    setSubtasks?: Dispatch<SetStateAction<ISubtask[]>>
}
    
export const SubtasksList = ({ subtasks, setSubtasks }: SubtasksListProps) => {
    const editText = (task: ISubtask, newText: string) => setSubtasks && setSubtasks(prev => (prev.map(t => t.text===task.text ? {...t, text: newText} : t)))

    const toggleIsDone = (task: ISubtask) => setSubtasks && setSubtasks(prev => (prev.map(t => t.text===task.text ? {...t, isDone: !t.isDone} : t)))

    return (
        <div className='subtasksList'>
            {subtasks.map(task => (
                <Subtask key={task.text} subtask={task} toggleIsDone={() => toggleIsDone(task)} editText={(newText: string) => editText(task, newText)}/>
            ))}
        </div>
    );
};