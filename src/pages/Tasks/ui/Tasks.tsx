import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/elements/Button';
import { ButtonTheme } from '../../../components/elements/Button/ui/Button';
import { Column } from '../../../components/modules/Column';
import { EditTask } from '../../../components/modules/EditTask';
import { Header } from '../../../components/modules/Header';
import { Modal } from '../../../components/modules/Modal';
import { Task } from '../../../components/modules/Task';
import { selectProjects } from '../../../store/projects/selector';
import { updateTask } from '../../../store/tasks/actions';
import { selectAllTasks } from '../../../store/tasks/selector';
import { IProject, ITask, Status } from '../../../utils/data';
import './Tasks.scss';
    
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
            <Header><h1><Link to='/'>{projects[id].title} / </Link> tasks</h1></Header>
            <main>
                <Button theme={ButtonTheme.PRIMARY} onClick={() => setOpenModal(true)}>
                    ➕ Add Task
                </Button>
                <div className='columns'>
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
            </main>

            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <EditTask onCancel={() => setOpenModal(false)} projectId={id!}/>
            </Modal>}
        </>
    );
};