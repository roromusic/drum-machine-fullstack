import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {BrowserRouter as Router} from 'react-router-dom';
import rootReducer from '../reducers';
import App from './App';

const middleware = [thunk, createLogger()];

const initialState = {
    beats: {
        beats: [],
        displayName: "",
        userId: ""
    },
    currentBeat: {
        userId: {}
    }
}
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);

const DrumMachine = () => (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

export default DrumMachine;