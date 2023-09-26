import { HtmlHTMLAttributes, ReactNode } from 'react';
import './Card.scss';
    
interface CardProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}
    
export const Card = ({children, className, ...otherProps }: CardProps) => {
    return (
        <div className={`card ${className || ''}`} {...otherProps}>
            {children}
        </div>
    );
};