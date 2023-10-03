import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/elements/Button';
import { ButtonTheme } from '../../../components/elements/Button/ui/Button';
import './NotFound.scss';
    
 
export const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='notFound'>
            <div className='notFound-content'>
                <h1>Page not found!</h1>
                <Button theme={ButtonTheme.PRIMARY} onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>
        </div>
    );
};