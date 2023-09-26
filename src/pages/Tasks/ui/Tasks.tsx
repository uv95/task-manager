import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/elements/Button';
import { ButtonTheme } from '../../../components/elements/Button/ui/Button';
import { AddTask } from '../../../components/modules/AddTask';
import { Column } from '../../../components/modules/Column';
import { Header } from '../../../components/modules/Header';
import { Modal } from '../../../components/modules/Modal';
import { Task } from '../../../components/modules/Task';
import { selectProjects } from '../../../store/projects/selector';
import { selectAllTasks } from '../../../store/tasks/selector';
import { IProject, ITask, Status } from '../../../utils/data';
import './Tasks.scss';
    
interface TasksProps {
}
    
export const Tasks = () => {
    const navigate = useNavigate()
    const params = useParams();
    const id = params.id!;

    const tasks = useSelector(selectAllTasks) as Record<string, ITask>
    const projects = useSelector(selectProjects) as Record<string, IProject>

    const [openModal, setOpenModal] = useState(false)

    const columns = Object.values(Status)

    if (!projects[id]) return <p>No project found!</p>
    
    return (
        <>
            <Header title={'Tasks'}/>
            <Button theme={ButtonTheme.CLEAR} onClick={() => navigate(-1)}>
                ← Back
            </Button>
            <Button theme={ButtonTheme.PRIMARY} onClick={() => setOpenModal(true)}>
                ➕ Add Task
            </Button>
            <div className='tasks'>
                {columns.map(column => (
                    <Column key={column} title={column}>
                        {projects[id].tasks.map((taskId: string) => (
                            tasks[taskId].status === column && <Task key={taskId} task={tasks[taskId]} projectId={id}/> 
                        ))}

                    </Column>
                ))}
            </div>

            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <AddTask onCancel={() => setOpenModal(false)} projectId={id!}/>
            </Modal>}
        </>
    );
};