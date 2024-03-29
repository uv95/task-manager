import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../../components/elements/Button';
import { ButtonTheme } from '../../../components/elements/Button/ui/Button';
import { AddProject } from '../../../components/modules/AddProject';
import { Header } from '../../../components/elements/Header';
import { Modal } from '../../../components/elements/Modal';
import { Project } from '../../../components/modules/Project';
import { selectProjects, selectProjectsLength } from '../../../store/projects/selector';
import { IProject } from '../../../utils/types';
import { PlusIcon } from '@heroicons/react/24/solid'       
import './Projects.scss';

export const Projects = () => {
    const [openModal, setOpenModal] = useState(false)
    const projects = useSelector(selectProjects)
    const projectsLength = useSelector(selectProjectsLength)

    return (
        <>
            <Header><h1>Projects</h1></Header>
            <main id='main' className='projectsContainer'>
                <Button className='addProjectButton' theme={ButtonTheme.PRIMARY} onClick={() => setOpenModal(true)}>
                    <PlusIcon width={15}/> Add Project
                </Button>
                <div className='projects'>
                    {projectsLength === 0 ? <p className='noProjects'>No projects yet.</p> :    
                        Object.values(projects).map((project: IProject) => (
                            <Project key={project.id} project={project} id={project.id}/>
                        ))}
                </div>

            </main>

            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <AddProject onCancel={() => setOpenModal(false)}/>
            </Modal>}
        </>
    );
};