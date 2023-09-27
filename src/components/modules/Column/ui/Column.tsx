import { forwardRef, HtmlHTMLAttributes, ReactNode, Ref } from 'react';
import './Column.scss';
    
interface ColumnProps extends HtmlHTMLAttributes<HTMLDivElement> {
    title: string
    children: ReactNode
    isDraggingOver: boolean
}
    
export const Column = forwardRef<HTMLDivElement, ColumnProps>(function Column({ title, children, isDraggingOver }, ref) {
    return (
        <div className='column'>
            <h1 className='title'>{title}</h1>
            <div ref={ref} className={`tasksContainer ${isDraggingOver ? 'tasksContainer-hovered' : ''}`}>
                {children}
            </div>
        </div>
    );
});