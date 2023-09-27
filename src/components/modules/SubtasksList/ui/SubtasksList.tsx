import { Dispatch, SetStateAction } from 'react';
import { useSubtasksContext } from '../../../../context/SubtasksContext';
import { ISubtask } from '../../../../utils/data';
import { AddSubtasks } from '../../AddSubtasks';
import { Subtask } from '../../Subtask/ui/Subtask';
import './SubtasksList.scss';
    
interface SubtasksListProps {
    initialSubtasks: ISubtask[]
    taskId?: string,
    cantEdit?: boolean
}
    
export const SubtasksList = ({ initialSubtasks, taskId, cantEdit }: SubtasksListProps) => {
    const { subtasks, setSubtasks } = useSubtasksContext()
    const editText = (task: ISubtask, newText: string) => setSubtasks && setSubtasks(prev => (prev.map(t => t.text===task.text ? {...t, text: newText} : t)))

    const toggleIsDone = (task: ISubtask) => setSubtasks && setSubtasks(prev => (prev.map(t => t.text===task.text ? {...t, isDone: !t.isDone} : t)))

    return (
        <div className='subtasksList'>
            {(initialSubtasks.length ? initialSubtasks : subtasks).map((task, index) => (
                <Subtask key={index} subtask={task} toggleIsDone={() => toggleIsDone(task)} editText={(newText: string) => editText(task, newText)} cantEdit={cantEdit}/>
            ))}

            <AddSubtasks initialSubtasks={subtasks} taskId={taskId} cantEdit={cantEdit}/>
        </div>
    );
};