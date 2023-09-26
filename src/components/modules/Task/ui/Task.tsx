import { forwardRef, HtmlHTMLAttributes, useState } from 'react';
import { ITask } from '../../../../utils/data';
import { Card } from '../../../elements/Card';
import { Modal } from '../../Modal';
import { TaskInfo } from '../../TaskInfo';
import { DraggableProvided } from 'react-beautiful-dnd';

import './Task.scss';
    
interface TaskProps extends HtmlHTMLAttributes<HTMLDivElement> {
    task: ITask
    projectId: string
    provided: DraggableProvided
}
    
export const Task = forwardRef<HTMLDivElement, TaskProps>(function Task({ task, projectId, provided}, ref) {
    const [openModal, setOpenModal] = useState(false)

    return (
        <div ref={ref} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Card className='task' onClick={() => setOpenModal(true)}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <div>📄 {task.subtasks.filter(t => t.isDone).length}/{task.subtasks.length}</div>
            </Card>

            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <TaskInfo task={task} projectId={projectId}/>
            </Modal>}
        </div>
    );
});