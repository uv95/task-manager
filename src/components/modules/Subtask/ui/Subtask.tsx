import { ChangeEvent, useState } from 'react';
import { ISubtask } from '../../../../utils/data';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import './Subtask.scss';
    
interface SubtaskProps {
   subtask: ISubtask
   toggleIsDone: () => void
   editText: (newText: string) => void
}
    
export const Subtask = ({ subtask, toggleIsDone, editText }: SubtaskProps) => {
    const [isDisabled, setIsDisabled] = useState(true)
    const [text, setText] = useState(subtask.text)

    const onChange =(e:ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const onClick = () => {
        if(isDisabled) {
            setIsDisabled(false)
        } else {
            editText(text)
            setIsDisabled(true)
        }
    }

    return (
        <div className='subtask'>
            <div onClick={toggleIsDone}>{subtask.isDone ? '✅' : '☑️'}</div>
            <input className={`${isDisabled ? 'input-disabled' : 'input'}`} type="text" disabled={isDisabled} value={text} onChange={onChange}/>
            <Button theme={ButtonTheme.CLEAR} onClick={onClick}>{isDisabled ? '✏️' : '✔'}</Button>
        </div>
    );
};