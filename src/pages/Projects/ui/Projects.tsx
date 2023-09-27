import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/elements/Button';
import { ButtonTheme } from '../../../components/elements/Button/ui/Button';
import { AddProject } from '../../../components/modules/AddProject';
import { Header } from '../../../components/modules/Header';
import { Modal } from '../../../components/modules/Modal';
import { Project } from '../../../components/modules/Project';
import { selectProjects } from '../../../store/projects/selector';
import { IProject } from '../../../utils/data';
import './Projects.scss';
    
interface ProjectsProps {
}
    
export const Projects = () => {
    const [openModal, setOpenModal] = useState(false)
    const projects = useSelector(selectProjects)
    console.log(projects)
    return (
        <>
            <Header><h1>Projects</h1></Header>
            <main>
                <Button theme={ButtonTheme.PRIMARY} onClick={() => setOpenModal(true)}>
                    ➕ Add Project
                </Button>
                <div className='Projects'>
                    {Object.values(projects).map((project: IProject) => (
                        <Project key={project.id} title={project.title} id={project.id}/>
                    ))}
                </div>
            </main>

            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <AddProject onCancel={() => setOpenModal(false)}/>
            </Modal>}
        </>
    );
};