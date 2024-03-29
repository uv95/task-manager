import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTaskComments } from '../../../../store/comments/selector';
import { deleteTaskId } from '../../../../store/projects/actions';
import { selectProjects } from '../../../../store/projects/selector';
import { deleteTask } from '../../../../store/tasks/actions';
import { deleteAllTaskComments } from '../../../../store/comments/actions';
import { formatDate } from '../../../../utils/formatDate';
import { getTimeInProgress } from '../../../../utils/getTimeInProgress';
import { IProject, ITask } from '../../../../utils/types';
import { Button } from '../../../elements/Button';
import { Tag } from '../../../elements/Tag';
import { TagSize, TagTheme } from '../../../elements/Tag/ui/Tag';
import { CommentsList } from '../../CommentsList';
import { EditTask } from '../../EditTask';
import { SubtasksList } from '../../SubtasksList';
import { ClockIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'  
import './TaskInfo.scss';
    
interface TaskInfoProps {
    task: ITask
    projectId: string
}
    
export const TaskInfo = ({task, projectId }: TaskInfoProps) => {
    const dispatch = useDispatch();
    const comments = useSelector(selectAllTaskComments(task.id));
    const projects = useSelector(selectProjects) as Record<string, IProject>
    const projectTitle = projects[projectId].title;
    const taskInProgressFor = getTimeInProgress(task.starts);

    const [editTask, setEditTask] = useState(false);

    const onDelete = () => {
        dispatch(deleteTask(task.id))
        dispatch(deleteTaskId({taskId: task.id, projectId}))
        dispatch(deleteAllTaskComments(task.comments))
    }

    return (
        <>
            <div className='taskInfo'>
                {!editTask && <>
                    <div className="taskInfo-heading">
                        <div>
                            <p className='additionalInfo'> {projectTitle}</p>
                            <h2><span className='taskIndex'>#{task.number}</span> {task.title}</h2>
                            {task.ends && <p className='additionalInfo'><ClockIcon width={15}/> {formatDate(task.ends)}</p>}
                        </div>
                        <div className="taskInfo-buttons">
                            <Button onClick={onDelete}>
                                <TrashIcon width={20}/> 
                            </Button>
                            <Button onClick={() => setEditTask(true)}>
                                <PencilIcon width={20}/> 
                            </Button>
                        </div>
                    </div>
                    <div className='info'>Status: <Tag text={task.status} theme={TagTheme.STATUS} size={TagSize.L}/></div>

                    <div className='info'>Priority: <Tag text={task.priority} theme={TagTheme.PRIORITY} size={TagSize.L}/></div>

                    <div className='info'>Starts: <span>{formatDate(task.starts)}</span></div>

                    {task.ends && <div className='info'>Ends: <span>{formatDate(task.ends)}</span></div>}

                    <div className='info'>In progress: <span>{taskInProgressFor}</span></div>

                    <div className='info'>{task.description}</div>

                    <div className="info">Subtasks: <span>{task.subtasks.length}</span></div>

                    <SubtasksList initialSubtasks={task.subtasks} cantEdit taskId={task.id}/>
                    <CommentsList comments={comments} taskId={task.id}/>
                </>}
            </div>

            {editTask && <EditTask task={task} onClose={() => setEditTask(false)} projectId={projectId}/>}
            
        </>
    );
};