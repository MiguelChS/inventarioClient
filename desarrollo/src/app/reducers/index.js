/**
 * Created by mc185249 on 1/11/2017.
 */
import { combineReducers } from 'redux';
import modal from './ModalReducer';
import modalV2 from './ModalReducerV2';
import dateGrafic from './dateGraficReducer';
import BoxFilter from  './BoxFilterReducer';
import App from './appReducer';
import MisIncidente from './MisIncidenteReducer';

export default combineReducers({
    app:App,
    dateGrafic:dateGrafic,
    modal:modal,
    BoxFilter:BoxFilter,
    misIncidente:MisIncidente,
    modalV2:modalV2
})