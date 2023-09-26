import { useDispatch } from 'react-redux';
import { deleteTaskId } from '../../../../store/projects/actions';
import { deleteTask } from '../../../../store/tasks/actions';
import { ITask } from '../../../../utils/data';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import './TaskInfo.scss';
    
interface TaskInfoProps {
    task: ITask
    projectId: string
}
    
export const TaskInfo = ({task, projectId }: TaskInfoProps) => {
    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(deleteTask(task.id))
        dispatch(deleteTaskId({taskId: task.id, projectId}))
    }
    return (
        <div className='TaskInfo'>
            task info {task.title}
            <Button theme={ButtonTheme.OUTLINE} onClick={onDelete}>
                Delete
            </Button>
        </div>
    );
};