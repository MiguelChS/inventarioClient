/**
 * Created by mc185249 on 1/11/2017.
 */
import { combineReducers } from 'redux';

import equipo from './equipoReducer';
import site from  './FormSiteReducer';
import modal from './ModalReducer';
import autoComp from './AutoCompleteReducer';
import formPosition from './ReducerFormularioPosition';
import dateGrafic from './dateGraficReducer';
import source from './SourceReducer';
import BoxFilter from  './BoxFilterReducer';
import App from './appReducer';
import SiteClient from './FormSiteClientReducer';
import Login from './LoginReducer';
import AssignPosicion from './AsignacionPosicionReducer';
import ModiSite from './ModificacionSite';
import ModiEquipo from './EquipoModificacionReducer';
import DBA from './DbaReducer';

export default combineReducers({
    equipo: equipo,
    site:site,
    siteClient:SiteClient,
    modal:modal,
    AutoComplete:autoComp,
    formPosition:formPosition,
    dateGrafic:dateGrafic,
    source:source,
    BoxFilter:BoxFilter,
    app:App,
    login:Login,
    assignPosicion:AssignPosicion,
    siteModi:ModiSite,
    equipoModi: ModiEquipo,
    dba:DBA
})