import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/index';

import logger from "redux-logger"
import thunk from "redux-thunk"
import reduxMulti from 'redux-multi';

const middleware = applyMiddleware(reduxMulti, thunk,logger());

export default createStore(reducer,middleware);