import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import { Provider } from 'react-redux'

import store from './store'
import App from './containers/App';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));


serviceWorker.unregister();

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
