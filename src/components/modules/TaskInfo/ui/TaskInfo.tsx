import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useSubtasksContext } from '../../../../context/SubtasksContext';
import { deleteTaskId } from '../../../../store/projects/actions';
import { selectProjects } from '../../../../store/projects/selector';
import { deleteTask } from '../../../../store/tasks/actions';
import { IProject, ITask } from '../../../../utils/types';
import { formatDate } from '../../../../utils/formatDate';
import { getTimeInProgress } from '../../../../utils/getTimeInProgress';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import { Tag } from '../../../elements/Tag';
import { TagSize, TagTheme } from '../../../elements/Tag/ui/Tag';
import { EditTask } from '../../EditTask';
import { SubtasksList } from '../../SubtasksList';
import './TaskInfo.scss';
    
interface TaskInfoProps {
    task: ITask
    projectId: string
}
    
export const TaskInfo = ({task, projectId }: TaskInfoProps) => {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects) as Record<string, IProject>
    const projectTitle = projects[projectId].title;
    const taskInProgressFor = getTimeInProgress(task.starts);
    const {setSubtasks} = useSubtasksContext();

    const [editTask, setEditTask] = useState(false);

    const onDelete = () => {
        dispatch(deleteTask(task.id))
        dispatch(deleteTaskId({taskId: task.id, projectId}))
    }

    console.log(task)

    return (
        <>
            <div className='taskInfo'>
                {!editTask && <>
                    <div className="heading">
                        <div>
                            <p className='additionalInfo'> {projectTitle}</p>
                            <h2>{task.title}</h2>
                            {task.ends && <p className='additionalInfo'>🕑 {formatDate(task.ends)}</p>}
                        </div>
                        <Button theme={ButtonTheme.CLEAR} onClick={() => setEditTask(true)}>
                            ✏️
                        </Button>
                    </div>
                    <div className='info'>Status: <Tag text={task.status} theme={TagTheme.STATUS} size={TagSize.L}/></div>
                    <div className='info'>Priority: <Tag text={task.priority} theme={TagTheme.PRIORITY} size={TagSize.L}/></div>
                    <div className='info'>Starts: {formatDate(task.starts)}</div>
                    {task.ends && <div className='info'>Ends: {formatDate(task.ends)}</div>}
                    <div className='info'>In progress: {taskInProgressFor}</div>
                    <div className='info'>{task.description}</div>
                    <div className="info">Subtasks: {}</div>
                    <SubtasksList initialSubtasks={task.subtasks} cantEdit/>
                    <Button theme={ButtonTheme.OUTLINE} onClick={onDelete}>
                        Delete
                    </Button>
                </>}
            </div>

            {editTask && <EditTask task={task} onCancel={() => {
                setEditTask(false) 
                setSubtasks([])
            }} projectId={projectId}/>}
            
        </>
    );
};