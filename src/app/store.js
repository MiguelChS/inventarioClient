import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/index';

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

const middleware = applyMiddleware(promise(), thunk, logger());

export default createStore(reducer,middleware);