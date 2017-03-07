/**
 * Created by mc185249 on 1/11/2017.
 */
require('es6-promise/auto');
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router,browserHistory } from 'react-router';
import store from './store';
import router from './router.jsx';


const app = document.getElementById('app');

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {router}
        </Router>
    </Provider>,
    app);