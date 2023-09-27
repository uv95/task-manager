import './App.css';
import { AppRouter } from './components/modules/AppRouter'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <main id='main'>
                    <AppRouter/>
                </main>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
