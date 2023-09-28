import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import { v4 as uuidv4 } from 'uuid'
import './AddProject.scss';
import { IProject } from '../../../../utils/types';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../../store/projects/actions';
    
interface AddProjectProps {
    onCancel: () => void
}
    
export const AddProject = ({ onCancel }: AddProjectProps) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<IProject>({id: '', title: '', tasks: []})

    const onSubmit = (e:FormEvent) => {
        e.preventDefault()
        dispatch(addProject({...formData, id: uuidv4(),}))
        onCancel()
    }

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            title: e.target.value
        })
    }

    return (
        <div className='addProject'>
            <h2>New Project</h2>
            <form onSubmit={onSubmit}>
                <input required type="text" id='title' placeholder='Project title' value={formData.title} onChange={onChange}/>
      
                <div className="buttons">
                    <Button theme={ButtonTheme.OUTLINE} onClick={onCancel}>Cancel</Button>
                    <Button type='submit' theme={ButtonTheme.PRIMARY}>Add</Button>
                </div>
            </form>
        </div>
    );
};