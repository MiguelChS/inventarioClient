/**
 * Created by mc185249 on 1/11/2017.
 */
require('es6-promise/auto');
require("babel-polyfill");
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import Main from './components/index';
import store from './store';

/*sacar item repetidos global*/
Array.prototype.unique = function(a) {
    return function() { return this.filter(a) }
}(function(a, b, c) {
    return c.indexOf(a, b + 1) < 0
});

const app = document.getElementById('app');

render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    app);