import { useState } from 'react';
import { ITask } from '../../../../utils/data';
import { Card } from '../../../elements/Card';
import { Modal } from '../../Modal';
import { TaskInfo } from '../../TaskInfo';
import './Task.scss';
    
interface TaskProps {
    task: ITask
    projectId: string
}
    
export const Task = ({ task, projectId}: TaskProps) => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <Card className='task' onClick={() => setOpenModal(true)}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
            </Card>

            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <TaskInfo task={task} projectId={projectId}/>
            </Modal>}
        </>
    );
};