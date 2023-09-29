import { useState } from 'react';
import { ITask, Status } from '../../../../utils/types';
import { Task } from '../../Task';
import './ColumnsMobile.scss';
    
interface ColumnsMobileProps {
    tasks: ITask[]
    projectId: string
}
    
export const ColumnsMobile = ({tasks, projectId}: ColumnsMobileProps) => {
    const [currentColumn, setCurrentColumn] = useState(Status.QUEUE);

    return (
        <div className='columnsMobile'>
            <div className="columnsMobile-titles">
                {Object.values(Status).map(column => (
                    <h1 key={column} style={{fontWeight: currentColumn===column ? '700' : 'normal'}} onClick={() => setCurrentColumn(column)}>{column}</h1>
                ))}
            </div>
            <div>
                {tasks.map(task => (
                    task.status === currentColumn && 
                    <Task key={task.id} task={task} projectId={projectId} /> 
                            
                ))}
            </div>     
        </div>
    );
};