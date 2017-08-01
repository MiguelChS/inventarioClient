/**
 * Created by mc185249 on 5/12/2017.
 */
import React from 'react';
import { changeParentApp , changeChildrenApp} from './appAction';
import PageLogin from '../components/page/Login/index'
import PageLayout from '../components/page/Layout';
import Inicio from '../components/page/inicio/index';
import * as Equipo from '../components/page/equipo/index'
import * as Posicion from '../components/page/posicion';
import * as Site from '../components/page/site/index';
import User from '../components/page/Usuario/index';
import Dba from '../components/page/DBA/index';
import {getSource} from './DbaAction';
import {loadTableStore} from './EquipoStoreAction';
import MisTicket from '../components/page/MisTicket'


export function pageLogin(){
    return changeParentApp(<PageLogin/>)
}

export function PageLayaout(){
    return changeParentApp(<PageLayout/>)
}

export function PageInicio(){
    return changeChildrenApp(<Inicio/>)
}

export function pageAltaEquipo(){
    return [
        changeChildrenApp(<Equipo.AltaEquipo/>),
        loadTableStore()
    ];
}

export function pageAltaPosicion(){
    return changeChildrenApp(<Posicion.AltaPosicion/>)
}
export function pageAltaSite(){
    return changeChildrenApp(<Site.Alta/>)
}
export function pageModificacionSite(){
    return changeChildrenApp(<Site.Modificacion/>)
}
export function pageModificarEquipo() {
    return changeChildrenApp(<Equipo.ModificacionEquipo/>)
}

export function PageUsuario() {
    return changeChildrenApp(<User/>)
}

export function PageDBA() {
    return [
        changeChildrenApp(<Dba/>),
        getSource()
    ]
}

export function PageMisTicket() {
    return changeChildrenApp(<MisTicket/>)
}

export function pageEditPosicion() {
    return changeChildrenApp(<Posicion.EditPosicion/>)
}