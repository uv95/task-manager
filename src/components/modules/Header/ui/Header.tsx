import { ReactNode } from 'react';
import './Header.scss';
    
interface HeaderProps {
    children: ReactNode
}
    
export const Header = ({ children}: HeaderProps) => {
    return (
        <header className='header'>
            <div className="headerContaner">
                {children}
            </div>
        </header>
    );
};