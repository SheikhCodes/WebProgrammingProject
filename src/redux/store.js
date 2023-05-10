import { createStore, applyMiddleware} from 'redux';
import persistedReducer from './rootReducer';
import thunk from 'redux-thunk';
import { persistStore} from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);
