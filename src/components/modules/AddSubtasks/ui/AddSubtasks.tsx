import { ChangeEvent, useState } from 'react';
import { useSubtasksContext } from '../../../../context/SubtasksContext';
import { ISubtask } from '../../../../utils/types';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import './AddSubtasks.scss';
    
interface AddSubtasksProps {
    initialSubtasks: ISubtask[]
    taskId?:string
    cantEdit?: boolean
}
    
export const AddSubtasks = ({ initialSubtasks, taskId, cantEdit }: AddSubtasksProps) => {
    const [addNewSubtask, setAddNewSubtask] = useState(false)
    const [newSubtask, setNewSubtask] = useState<ISubtask>({text: '', isDone: false})
    const { setSubtasks } = useSubtasksContext()

    const onChange =(e:ChangeEvent<HTMLInputElement>) => {
        setNewSubtask({text: e.target.value, isDone: false})
    }

    const onSaveSubtask = () => {
        setAddNewSubtask(false)        
        setSubtasks([...initialSubtasks, newSubtask])
    }

    return (
        <div className="addSubtasks">
            {addNewSubtask && <div className="input">
                <input type="text" onChange={onChange}/>
                <Button theme={ButtonTheme.PRIMARY} onClick={onSaveSubtask}>Save</Button>
            </div>}
                    
            {!cantEdit && <Button theme={ButtonTheme.OUTLINE} onClick={() => setAddNewSubtask(true)}>➕ New Subtask</Button>}
        </div>
    );
};