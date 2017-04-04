/**
 * Created by mc185249 on 1/11/2017.
 */
import { combineReducers } from 'redux';

import equipo from './equipoReducer';
import site from  './siteReducer';
import modal from './ModalReducer';
import autoComp from './AutoCompleteReducer';
import formPosition from './ReducerFormularioPosition';
import dateGrafic from './dateGraficReducer';

export default combineReducers({
    equipo: equipo,
    site:site,
    modal:modal,
    AutoComplete:autoComp,
    formPosition:formPosition,
    dateGrafic:dateGrafic
})