import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {Router} from 'react-router-dom';
import rootReducer from '../reducers';
import App from './App';
import history from '../history';

const middleware = [thunk, createLogger()];

const initialState = {
    beats: {
        beats: [],
        displayName: "",
        userId: ""
    },
    currentBeat: {
        userId: {
            _id: ""
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

const DrumMachine = () => (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

export default DrumMachine;