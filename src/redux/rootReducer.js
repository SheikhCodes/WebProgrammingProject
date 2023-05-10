import { combineReducers } from 'redux';
import learnerReducer from './reducers/learner.reducer';
import adminReducer from './reducers/admin.reducer';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { persistReducer} from 'redux-persist';


const rootReducer = combineReducers({
    learnerState: learnerReducer,
    adminState: adminReducer
});
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['learnerState','adminState']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;