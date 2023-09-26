import { createStore} from 'redux';
import { saveState } from './localStorage';
import { rootReducer } from './rootReducer';

const store = createStore(rootReducer)

// store.subscribe(() => saveState({}))

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
