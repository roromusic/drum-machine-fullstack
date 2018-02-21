import {combineReducers} from 'redux';
import user from './user';
import currentBeat from './currentBeat';

const rootReducer = combineReducers({
    user,
    currentBeat
});

export default rootReducer;