import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../../components/elements/Button';
import { ButtonTheme } from '../../../components/elements/Button/ui/Button';
import { Header } from '../../../components/elements/Header';
import { Modal } from '../../../components/elements/Modal';
import { Column } from '../../../components/modules/Column';
import { EditTask } from '../../../components/modules/EditTask';
import { SearchTask } from '../../../components/modules/SearchTask';
import { Task } from '../../../components/modules/Task';
import { selectCurrentProject } from '../../../store/projects/selector';
import { updateTask } from '../../../store/tasks/actions';
import { selectAllTasks, selectVisibleTasks } from '../../../store/tasks/selector';
import { ITask, Status } from '../../../utils/types';
import { PlusIcon } from '@heroicons/react/24/solid'       
import './Tasks.scss';
import { ColumnsMobile } from '../../../components/modules/ColumnsMobile';
    
export const Tasks = () => {
    const params = useParams();
    const id = params.id!;
    const dispatch = useDispatch()
    const tasks = useSelector(selectAllTasks) as Record<string, ITask>
    const project = useSelector(selectCurrentProject(id))
    
    const [openModal, setOpenModal] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [width, setWidth] = useState(1000)
    const visibleTasks = useSelector(selectVisibleTasks(searchInput))

    const columns = Object.values(Status)

    const onDragEnd = (result: DropResult) => {
        if(!result.destination) return;

        const { destination, draggableId} = result;
        const destinationStatus = destination.droppableId

        dispatch(updateTask({taskId: draggableId, updatedFields:{
            ...tasks[draggableId],
            status: destinationStatus as Status
        }}))
    }

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)        
        return () => { 
            window.removeEventListener("resize", handleResize)
        }
    })

    if (!project) return <p>No project found!</p>
    
    return (
        <>
            <Header><h1><Link to='/'>{project.title} / </Link> tasks</h1></Header>
            <main id='main'>
                <div className="tasksHeading">
                    <SearchTask input={searchInput} setInput={setSearchInput} />
                    <Button theme={ButtonTheme.PRIMARY} onClick={() => setOpenModal(true)}>
                        <PlusIcon width={15}/> Add Task
                    </Button>
                </div>

                {width < 630 ? <ColumnsMobile tasks={visibleTasks} projectId={id}/> : <div className='columns'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {columns.map(column => (
                            <Droppable key={column} droppableId={column}>
                                {(provided, snapshot) => (
                                
                                    <Column title={column} {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver }>

                                        {visibleTasks.map((task: ITask, index: number) => (
                                            task.status === column && 
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <Task task={task} projectId={id} ref={provided.innerRef} provided={provided}/> 
                                                    )}
                                               
                                                </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Column>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
                </div>}
            </main>

            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <EditTask onClose={() => setOpenModal(false)} projectId={id!}/>
            </Modal>}
        </>
    );
};