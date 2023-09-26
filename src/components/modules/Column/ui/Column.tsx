import { forwardRef, HtmlHTMLAttributes, ReactNode, Ref } from 'react';
import './Column.scss';
    
interface ColumnProps extends HtmlHTMLAttributes<HTMLDivElement> {
    title: string
    children: ReactNode
    isDraggingOver: boolean
}
    
export const Column = forwardRef<HTMLDivElement, ColumnProps>(function Column({ title, children, isDraggingOver }, ref) {
    return (
        <div ref={ref} className={`column ${isDraggingOver ? 'column-hovered' : ''}`}>
            <h1>{title}</h1>
            {children}
        </div>
    );
});