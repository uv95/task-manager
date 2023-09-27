import { createStore} from 'redux';
import { loadState, saveState } from './localStorage';
import { rootReducer } from './rootReducer';

const persistedState = loadState();

const store = createStore(rootReducer, persistedState)

store.subscribe(() => saveState(store.getState()))

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
