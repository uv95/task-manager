import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/elements/Button';
import { ButtonTheme } from '../../../components/elements/Button/ui/Button';
import { AddTask } from '../../../components/modules/AddTask';
import { Column } from '../../../components/modules/Column';
import { Header } from '../../../components/modules/Header';
import { Modal } from '../../../components/modules/Modal';
import { Task } from '../../../components/modules/Task';
import { mockProjects, mockTasks } from '../../../utils/data';
import './Tasks.scss';
    
interface TasksProps {
}
    
export const Tasks = ({ }: TasksProps) => {
    const navigate = useNavigate()
    const params = useParams();
    const {id} = params;

    const [openModal, setOpenModal] = useState(false)


    const columns = [
        {
            title: 'QUEUE'
        },
        {
            title: 'DEVELOPMENT'
        },
        {
            title: 'DONE'
        },
    ]

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
                <Column key={column.title} title={column.title}>
                    {id && mockProjects.entities[id].tasks.map((taskId: string) => (
                        <Task key={taskId} task={mockTasks.entities[taskId]}/>
                        ))}

                </Column>
            ))}
        </div>

        {openModal && <Modal onClose={() => setOpenModal(false)}>
               <AddTask onCancel={() => setOpenModal(false)}/>
            </Modal>}
            </>
    );
};