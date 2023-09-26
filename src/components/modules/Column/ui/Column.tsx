import { ReactNode } from 'react';
import './Column.scss';
    
interface ColumnProps {
    title: string
    children: ReactNode
}
    
export const Column = ({ title, children }: ColumnProps) => {
    return (
        <div className='column'>
            <h1>{title}</h1>
            {children}
        </div>
    );
};