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
import Login from './LoginReducer';
import AssignPosicion from './AsignacionPosicionReducer';
import ModiSite from './ModificacionSite';
import ModiEquipo from './EquipoModificacionReducer';
import DBA from './DbaReducer';
import ChangeStqateInicident from './changeStateIncidenteReducer';
import MisTicket from './MisTicketReducer';
import ModalV2 from './ModalReducerV2';
import EditPos from './ReducerEditPosicion';
import formEquipo from './formularioEquipo';
import storeEquipo from './EquipoStore';

export default combineReducers({
    equipo: equipo,
    site: site,
    modal: modal,
    AutoComplete: autoComp,
    formPosition: formPosition,
    dateGrafic: dateGrafic,
    source: source,
    BoxFilter: BoxFilter,
    app: App,
    login: Login,
    assignPosicion: AssignPosicion,
    siteModi: ModiSite,
    equipoModi: ModiEquipo,
    dba: DBA,
    chInc: ChangeStqateInicident,
    misTicket: MisTicket,
    modalV2: ModalV2,
    editPos: EditPos,
    formEquipo: formEquipo,
    storeEquipo: storeEquipo
})