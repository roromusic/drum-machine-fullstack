import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DrumMachine from './containers/DrumMachine';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<DrumMachine />, document.getElementById('root'));
registerServiceWorker();
