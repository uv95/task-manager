import { Link } from 'react-router-dom';
import { Card } from '../../../elements/Card';
import './Project.scss';
    
interface ProjectProps {
    title: string,
    id: string
}
    
export const Project = ({title, id}: ProjectProps) => {
    return (
        <Link to={`/${id}`}>
            <Card className='task'>
                <h2>{title}</h2>
            </Card>
        </Link>
    );
};