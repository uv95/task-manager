import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { SubtasksProvider } from '../../../../context/SubtasksContext';
import './Modal.scss';
    
interface ModalProps {
    children: ReactNode;
    onClose?: () => void;
}
    
export default function Modal({ children, onClose }: ModalProps) {
    return createPortal(
        <SubtasksProvider>
            <div className='backdrop' onClick={onClose}></div>
            <div id="modal" className='modal'>
                {children}
            </div>
        </SubtasksProvider>, document.body
    );
}