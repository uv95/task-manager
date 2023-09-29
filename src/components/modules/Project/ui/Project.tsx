import { TrashIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProject } from '../../../../store/projects/actions';
import { deleteAllProjectTasks } from '../../../../store/tasks/actions';
import { IProject } from '../../../../utils/types';
import { Button } from '../../../elements/Button';
import { Card } from '../../../elements/Card';
import './Project.scss';
    
interface ProjectProps {
    project: IProject,
    id: string
}
    
export const Project = ({project, id}: ProjectProps) => {
    const dispatch = useDispatch()

    const onDelete = () => {
        dispatch(deleteProject(project.id)) 
        dispatch(deleteAllProjectTasks(project.tasks)) 
    }

    return (
        <Card className='project'>
            <Button onClick={onDelete}><TrashIcon width={15}/></Button>
            <Link to={`/${id}`}>
                <h2>{project.title}</h2>
                <p>Some info about the project here...</p>
                <p className='tasksNumber'>{project.tasks.length===0 ? 'No tasks yet.' : `${project.tasks.length} ${project.tasks.length===1 ? 'task' : 'tasks'}`}</p>
            </Link>
        </Card>
    );
};