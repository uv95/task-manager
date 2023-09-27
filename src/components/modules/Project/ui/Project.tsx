import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProject } from '../../../../store/projects/actions';
import { IProject } from '../../../../utils/data';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import { Card } from '../../../elements/Card';
import './Project.scss';
    
interface ProjectProps {
    project: IProject,
    id: string
}
    
export const Project = ({project, id}: ProjectProps) => {
    const dispatch = useDispatch()

    const onDelete = () => dispatch(deleteProject(project.id))

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