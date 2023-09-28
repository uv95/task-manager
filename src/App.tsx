import './App.css';
import { AppRouter } from './components/modules/AppRouter'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { SubtasksProvider } from './context/SubtasksContext';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <SubtasksProvider>
                    <AppRouter/>
                </SubtasksProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
