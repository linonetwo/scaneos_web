import React from 'react';
import ReactDOM from 'react-dom';
import { getState } from 'loadable-components'

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './globalStyle';

window.snapSaveState = () => getState();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
