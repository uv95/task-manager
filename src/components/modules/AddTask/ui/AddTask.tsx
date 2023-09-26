import { ChangeEvent, FormEvent, useState } from 'react';
import { ITask, Priority, Status } from '../../../../utils/data';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import { v4 as uuidv4 } from 'uuid'
import './AddTask.scss';
import { Select } from '../../Select';
    
interface AddTaskProps {
    onCancel: () => void
}
    
export const AddTask = ({onCancel }: AddTaskProps) => {
    const [formData, setFormData] = useState<ITask>({
        id: '',
        title: 'New Task',
        description: '',
        createdAt: new Date(Date.now()),
        timeInProgress: 'Created now',
        priority: Priority.MEDIUM,
        status: Status.QUEUE,
    })

    const onSubmit = (e:FormEvent) => {
        e.preventDefault()
        console.log('project added')
        onCancel()
    }

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            id: uuidv4(),
            [e.target.id]: e.target.value
        })
    }
    return (
        <div className='addTask'>
            <h2>New Task</h2>
            <form onSubmit={onSubmit}>
                <div className="input">
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' placeholder='Task title' value={formData.title} onChange={onChange}/>
                </div>
                <div className="input">
                    <label htmlFor="description">Description</label>
                    <input type="text" id='description' placeholder='Task description' value={formData.description} onChange={onChange}/>
                </div>

                <div className="selects">
                    <Select options={Object.values(Status)} defaultOption={formData.status} setSelected={(option:string) => setFormData(prev => ({
                        ...prev,
                        status: option as Status
                    }))}/>

                    <Select options={Object.values(Priority)} defaultOption={formData.priority} setSelected={(option:string) => setFormData(prev => ({
                        ...prev,
                        priority: option as Priority
                    }))}/>
                </div>

                <div className="buttons">
                    <Button theme={ButtonTheme.OUTLINE} onClick={onCancel}>Cancel</Button>
                    <Button type='submit' theme={ButtonTheme.PRIMARY}>Add</Button>
                </div>
            </form>
        </div>
    );
};