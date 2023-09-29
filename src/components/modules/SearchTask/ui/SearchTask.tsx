import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import './SearchTask.scss';
    
interface SearchTaskProps {
    input: string,
    setInput: Dispatch<SetStateAction<string>>
}
    
export const SearchTask = ({input, setInput}: SearchTaskProps) => {
    const ref = useRef<HTMLInputElement>(null)

    const onChange =(e:ChangeEvent<HTMLInputElement>) => setInput(e.target.value)
  
    const resetInput = () => {
        setInput('')
        ref.current && ref.current.focus()
    }

    return (
        <div className='searchTask'>
            <p>🔍</p>
            <input ref={ref} type="text" placeholder='Search by # or title' value={input} onChange={onChange}/>
            {input && <Button theme={ButtonTheme.CLEAR} onClick={resetInput}>✕</Button>}
        </div>
    );
};