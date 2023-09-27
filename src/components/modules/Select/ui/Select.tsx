import { HtmlHTMLAttributes, useState } from 'react';
import './Select.scss';
    
interface SelectProps extends HtmlHTMLAttributes<HTMLDivElement> {
    options: string[]
    defaultOption: string
    setSelected: (option: string) => void
}
    
export const Select = ({ options, defaultOption, setSelected }: SelectProps) => {
    const [openDropdown, setOpenDropdown] = useState(false)

    const onClick = (option:string) => {
        setSelected(option)
        setOpenDropdown(false)
    }

    return (
        <div className='select'>
            <div className='defaultOption' onClick={() => setOpenDropdown(!openDropdown)}>
                <p>{defaultOption}</p>
            </div>

            {openDropdown && <div className="options">
                {options.filter(o => o!==defaultOption).map(option => (
                    <div className='option' key={option} onClick={() => onClick(option)}>{option}</div>
                ))}
            </div>}
        </div>
    );
};