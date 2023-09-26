import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
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
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../store/tasks/actions';
    
interface TasksProps {
}
    
export const Tasks = () => {
    const navigate = useNavigate()
    const params = useParams();
    const id = params.id!;
    const dispatch = useDispatch()
    const tasks = useSelector(selectAllTasks) as Record<string, ITask>
    const projects = useSelector(selectProjects) as Record<string, IProject>

    const [openModal, setOpenModal] = useState(false)

    const columns = Object.values(Status)

    const onDragEnd = (result: DropResult) => {
        if(!result.destination) return;

        const { destination, draggableId} = result;
        const destinationStatus = destination.droppableId

        dispatch(updateTask({
            ...tasks[draggableId],
            status: destinationStatus as Status
        }))
    }

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
                <DragDropContext onDragEnd={onDragEnd}>
                    {columns.map(column => (
                        <Droppable key={column} droppableId={column}>
                            {(provided, snapshot) => (

                                <Column title={column} {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver }>
                                    {projects[id].tasks.map((taskId: string, index: number) => (
                                        tasks[taskId].status === column && 
                                            <Draggable key={taskId} draggableId={taskId} index={index}>
                                                {(provided, snapshot) => (
                                                    <Task task={tasks[taskId]} projectId={id} ref={provided.innerRef} provided={provided} /> 
                                                )}
                                               
                                            </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Column>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>

            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <AddTask onCancel={() => setOpenModal(false)} projectId={id!}/>
            </Modal>}
        </>
    );
};