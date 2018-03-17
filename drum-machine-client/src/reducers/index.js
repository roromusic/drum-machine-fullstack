import {combineReducers} from 'redux';
import user from './user';
import beats from './beats';
import currentBeat from './currentBeat';

const rootReducer = combineReducers({
    user,
    beats,
    currentBeat
});

export default rootReducer;