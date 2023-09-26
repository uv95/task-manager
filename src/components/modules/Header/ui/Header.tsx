import './Header.scss';
    
interface HeaderProps {
    title: string
}
    
export const Header = ({ title}: HeaderProps) => {
    return (
        <div className='Header'>
            <h1>{title}</h1>
        </div>
    );
};