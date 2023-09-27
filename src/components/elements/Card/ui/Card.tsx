import { forwardRef, HtmlHTMLAttributes, ReactNode } from 'react';
import './Card.scss';
    
interface CardProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}
    
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({children, className, ...otherProps }, ref) {
    return (
        <div ref={ref} className={`card ${className || ''}`} {...otherProps}>
            {children}
        </div>
    );
});