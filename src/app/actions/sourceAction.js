/**
 * Created by mc185249 on 4/5/2017.
 */
import request from '../Request/Request';
import { changeRequestApp } from './appAction';
import { PageInicio } from '../actions/ActionRouter';
import config from '../config';

export function loadSource(valor) {
    return {
        type:"LOAD_SOURCE",
        value:valor
    }
}

export function searchSource() {
    return[
        changeRequestApp(true),
        requestSource()
    ]
}

function requestSource() {
    return(dispatch)=>{
        request.get(`${config.path}/source/sourceInventario`)
            .then((result)=>{
                dispatch([
                    loadSource(result.data),
                    changeRequestApp(false),
                    PageInicio()
                ])
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false)
                ])
            });
    }
}

export function getSite(idClient) {
    return [
        changeRequestApp(true),
        requestGetSite(idClient)
    ]
}

export function getPosicion(idSite) {
    return [
        changeRequestApp(true),
        requestGetPosicion(idSite)
    ]
}

function requestGetSite(idClient) {
    return (dispatch) => {
        request.get(`${config.path}/source/site/${idClient}`)
            .then((result) => {
                dispatch([
                    {type: "SITE_SOURCE", value: result.data},
                    changeRequestApp(false)
                ]);
            })
            .catch((err) => {
                dispatch([
                    changeRequestApp(false)
                ])
            });
    }
}

function requestGetPosicion(idSite) {
    return function (dispatch) {
        request.get(`${config.path}/source/posicion/${idSite}`)
            .then((result) => {
                dispatch([
                    {type: "POSICION_SOURCE", value: result.data},
                    changeRequestApp(false)
                ]);
            })
            .catch((err) => {
                dispatch([
                    changeRequestApp(false)
                ])
            });
    }
}
