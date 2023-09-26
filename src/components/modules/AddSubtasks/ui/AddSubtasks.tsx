import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { ISubtask } from '../../../../utils/data';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import { SubtasksList } from '../../SubtasksList';
import './AddSubtasks.scss';
    
interface AddSubtasksProps {
    setSubtasks: Dispatch<SetStateAction<ISubtask[]>>
    subtasks: ISubtask[]
}
    
export const AddSubtasks = ({ setSubtasks, subtasks }: AddSubtasksProps) => {
    const [addNewSubtask, setAddNewSubtask] = useState(false)
    const [newSubtask, setNewSubtask] = useState<ISubtask>({text: '', isDone: false})

    const onChange =(e:ChangeEvent<HTMLInputElement>) => {
        setNewSubtask({text: e.target.value, isDone: false})
    }

    const onSaveSubtask = () => {
        setAddNewSubtask(false)
        setSubtasks(prev => ([...prev, newSubtask]))
    }

    return (
        <div className='AddSubtasks'>
            <h4>Subtasks</h4>
            <div className="subtasks">
                <SubtasksList setSubtasks={setSubtasks} subtasks={subtasks}/>

                {addNewSubtask && <div className="input">
                    <input type="text" onChange={onChange}/>
                    <Button theme={ButtonTheme.PRIMARY} onClick={onSaveSubtask}>Save</Button>
                </div>}
                    
                <Button theme={ButtonTheme.OUTLINE} onClick={() => setAddNewSubtask(true)}>➕ New Subtask</Button>
            </div>
        </div>
    );
};