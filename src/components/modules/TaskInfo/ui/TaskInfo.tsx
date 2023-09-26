import { ITask } from '../../../../utils/data';
import './TaskInfo.scss';
    
interface TaskInfoProps {
    task: ITask
}
    
export const TaskInfo = ({task }: TaskInfoProps) => {
    return (
        <div className='TaskInfo'>
            task info {task.title}
        </div>
    );
};