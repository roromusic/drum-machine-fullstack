import {combineReducers} from 'redux';
import user from './user';
import latest from './latest';

const rootReducer = combineReducers({
    user,
    latest
});

export default rootReducer;