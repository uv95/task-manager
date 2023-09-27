import { forwardRef, HtmlHTMLAttributes, useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { ITask } from '../../../../utils/data';
import { Card } from '../../../elements/Card';
import { Tag } from '../../../elements/Tag';
import { TagSize, TagTheme } from '../../../elements/Tag/ui/Tag';
import { Modal } from '../../Modal';
import { TaskInfo } from '../../TaskInfo';
import './Task.scss';

    
interface TaskProps extends HtmlHTMLAttributes<HTMLDivElement> {
    task: ITask
    projectId: string
    provided: DraggableProvided
}
    
export const Task = forwardRef<HTMLDivElement, TaskProps>(function Task({ task, projectId, provided}, ref) {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <Card ref={ref} {...provided.draggableProps} {...provided.dragHandleProps} className={`task task-${task.status}`} onClick={() => setOpenModal(true)}>
                <h2>{task.title}</h2>
                <p className='description'>{task.description}</p>

                <div className="bottom">
                    <div>📄 {task.subtasks.filter(t => t.isDone).length}/{task.subtasks.length}</div>
                    <div>🗣 {task.comments.length}</div>
                    <Tag text={task.priority} theme={TagTheme.PRIORITY} size={TagSize.S}/>
                </div>
            </Card>

            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <TaskInfo task={task} projectId={projectId}/>
            </Modal>}
        </>
    );
});