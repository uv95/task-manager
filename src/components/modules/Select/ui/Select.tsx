import { useState } from 'react';
import './Select.scss';
    
interface SelectProps {
    options: string[]
    defaultOption: string
    label: string
    setSelected: (option: string) => void
}
    
export const Select = ({ options, defaultOption, setSelected, label }: SelectProps) => {
    const [openDropdown, setOpenDropdown] = useState(false)

    const onClick = (option:string) => {
        setSelected(option)
        setOpenDropdown(false)
    }

    return (
        <div className='select'>
            <label htmlFor={label}>{label}</label>
            <div id={label} className={`dropdown ${openDropdown ? 'dropdown-open' : ''}`}>
                <div className='defaultOption' onClick={() => setOpenDropdown(!openDropdown)}>
                    <p>{defaultOption}</p>
                </div>

                {options.filter(o => o!==defaultOption).map(option => (
                    <div className='option' key={option} onClick={() => onClick(option)}>{option}</div>
                ))}
              
            </div>
        </div>
    );
};