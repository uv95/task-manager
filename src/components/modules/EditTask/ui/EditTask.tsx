import { format } from 'date-fns';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useSubtasksContext } from '../../../../context/SubtasksContext';
import { addTaskId } from '../../../../store/projects/actions';
import { addTask, updateTask } from '../../../../store/tasks/actions';
import { ITask, PriorityTypes, Status } from '../../../../utils/types';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import { Select } from '../../Select';
import { SubtasksList } from '../../SubtasksList';
import './EditTask.scss';
    
interface EditTaskProps {
    onClose: () => void
    projectId: string
    task?: ITask
}
    
export const EditTask = ({onClose, projectId, task }: EditTaskProps) => {
    const dispatch = useDispatch();

    const {subtasks, setSubtasks} = useSubtasksContext();
    const [formData, setFormData] = useState<ITask>({
        id: task?.id || '',
        title: task?.title || '',
        description: task?.description || '',
        starts: task?.starts || format(new Date(), 'yyyy-MM-dd'),
        timeInDevelopment: task?.timeInDevelopment || '',
        ends: task?.ends || '',
        priority: task?.priority || PriorityTypes.MEDIUM,
        status: task?.status || Status.QUEUE,
        comments: task?.comments || [],
        subtasks: task?.subtasks || subtasks
    })    

    const onSubmit = (e:FormEvent) => {
        e.preventDefault()
        if(task) {
            dispatch(updateTask({taskId: task.id, updatedFields:{...formData, subtasks}}))
        } else {
            const newId = uuidv4()
            dispatch(addTask({...formData, id: newId, subtasks}))
            dispatch(addTaskId({taskId: newId, projectId}))
        }
        onClose()
    }

    const onChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className='editTask'>
            {!task && <h2>New Task</h2>}
            <form onSubmit={onSubmit}>
                <div className="input">
                    {!task && <label className='required' htmlFor="title">Title</label>}
                    <input autoFocus className={`${task ? 'input-title' : ''}`} type="text" id='title' required placeholder='Task title' value={formData.title} onChange={onChange}/>
                </div>
                <div className="input">
                    <label className='required' htmlFor="starts">Starts</label>
                    <input type='date' id='starts' required value={formData.starts} onChange={onChange}/>
                </div>
                <div className="input">
                    <label className='required' htmlFor="ends">Ends</label>
                    <input type="date" id='ends' required value={formData.ends} onChange={onChange}/>
                </div>

                <div className="selects">
                    <div className="input">
                        <Select label='Status' options={Object.values(Status)} defaultOption={formData.status} setSelected={(option:string) => setFormData(prev => ({
                            ...prev,
                            status: option as Status
                        }))}/>
                    </div>
                    <div className="input">
                        <Select label='Priority' options={Object.values(PriorityTypes)} defaultOption={formData.priority} setSelected={(option:string) => setFormData(prev => ({
                            ...prev,
                            priority: option as PriorityTypes
                        }))}/>
                    </div>
                </div>

                <textarea className='input-description' id='description' placeholder='Describe the task...' value={formData.description} onChange={onChange}/>
                <h4>Subtasks</h4>
                <SubtasksList initialSubtasks={formData.subtasks} taskId={task?.id}/>  

                <div className="buttons">
                    
                    <Button theme={ButtonTheme.OUTLINE} onClick={() => {
                        setSubtasks([])
                        onClose()
                    }}>Cancel</Button>
                    <Button type='submit' theme={ButtonTheme.PRIMARY}>{task ? 'Save' : 'Add'}</Button>
                </div>
            </form>
        </div>
    );
};