/**
 * Created by mc185249 on 1/11/2017.
 */
import { combineReducers } from 'redux';

import equipo from './equipoReducer';
import site from  './siteReducer';

export default combineReducers({
    equipo: equipo,
    site:site
})