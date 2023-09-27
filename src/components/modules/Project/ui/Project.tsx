import { Link } from 'react-router-dom';
import { IProject } from '../../../../utils/data';
import { Card } from '../../../elements/Card';
import './Project.scss';
    
interface ProjectProps {
    project: IProject,
    id: string
}
    
export const Project = ({project, id}: ProjectProps) => {
    return (
        <Card className='project'>
            <Link to={`/${id}`}>
                <h2>{project.title}</h2>
                <p>Some info about the project here...</p>
                <p className='tasksNumber'>{project.tasks.length===0 ? 'No tasks yet.' : `${project.tasks.length} ${project.tasks.length===1 ? 'task' : 'tasks'}`}</p>
            </Link>
        </Card>
    );
};