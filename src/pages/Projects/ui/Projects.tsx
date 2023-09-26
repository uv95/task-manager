import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/elements/Button';
import { ButtonTheme } from '../../../components/elements/Button/ui/Button';
import { AddProject } from '../../../components/modules/AddProject';
import { Header } from '../../../components/modules/Header';
import { Modal } from '../../../components/modules/Modal';
import { Project } from '../../../components/modules/Project';
import { IProject, mockProjects } from '../../../utils/data';
import './Projects.scss';
    
interface ProjectsProps {
}
    
export const Projects = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <Header title={'Projects'}/>
            <Button theme={ButtonTheme.PRIMARY} onClick={() => setOpenModal(true)}>
                ➕ Add Project
            </Button>
            <div className='Projects'>
                {Object.values(mockProjects.entities).map((project: IProject) => (
                    <Project key={project.id} title={project.title} id={project.id}/>
                ))}
            </div>

            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <AddProject onCancel={() => setOpenModal(false)}/>
            </Modal>}
        </>
    );
};