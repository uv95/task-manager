import { forwardRef, HtmlHTMLAttributes, useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { useSubtasksContext } from '../../../../context/SubtasksContext';
import { selectAllComments } from '../../../../store/comments/selector';
import { selectTaskIndex } from '../../../../store/tasks/selector';
import { ITask } from '../../../../utils/types';
import { Card } from '../../../elements/Card';
import { Modal } from '../../../elements/Modal';
import { Tag } from '../../../elements/Tag';
import { TagSize, TagTheme } from '../../../elements/Tag/ui/Tag';
import { TaskInfo } from '../../TaskInfo';
import { ListBulletIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'       
import './Task.scss';

interface TaskProps extends HtmlHTMLAttributes<HTMLDivElement> {
    task: ITask
    projectId: string
    provided: DraggableProvided
}
    
export const Task = forwardRef<HTMLDivElement, TaskProps>(function Task({ task, projectId, provided}, ref) {
    const [openModal, setOpenModal] = useState(false)
    const { setSubtasks } = useSubtasksContext()
    const comments = useSelector(selectAllComments)
    const taskNumber = useSelector(selectTaskIndex(task.id)) + 1
  
    const onCloseModal = () => {
        setOpenModal(false)
        setSubtasks([])
    }
 
    //костыль
    const commentsLength = task.comments.filter(c => Object.keys(comments).includes(c)).length

    return (
        <>
            <Card ref={ref} {...provided.draggableProps} {...provided.dragHandleProps} className={`task task-${task.status}`} onClick={() => setOpenModal(true)}>
                <h2><span className='taskNumber'>#{taskNumber}</span> {task.title}</h2>
                <p className='description'>{task.description}</p>

                <div className="bottom">
                    <div className='bottomInfo'><ListBulletIcon width={15}/> {task.subtasks.filter(t => t.isDone).length}/{task.subtasks.length}</div>
                    <div className='bottomInfo'><ChatBubbleOvalLeftIcon width={15}/> {commentsLength}</div>
                    <Tag text={task.priority} theme={TagTheme.PRIORITY} size={TagSize.S}/>
                </div>
            </Card>

            {openModal && <Modal onClose={onCloseModal}>
                <TaskInfo task={task} projectId={projectId}/>
            </Modal>}
        </>
    );
});