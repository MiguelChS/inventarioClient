/**
 * Created by mc185249 on 7/12/2017.
 */
import Request from '../Request/Request';
import { changeRequestApp } from './appAction';
import config from '../config';

export function getIncientes() {
    return[
        changeRequestApp(true),
        getRequestIniciden()
    ]
}

export function loadaTable(data) {
    return {
        type:"CARGAR_TABLA_DBA",
        value:data
    }
}

export function insertError(data) {
    return{
        type:"ERR_DBA",
        value:data
    }
}


export function loadSource(data) {
    return {
        type:"LOAD_SOURCE_DBA",
        value:data
    }
}

export function getSource() {
    return[
        changeRequestApp(true),
        requestStado()
    ]
}

export function changeEstado(data) {
    return [
        changeRequestApp(true),
        requestChangeState(data)
    ]
}

function requestChangeState(data) {
    return (dispatch)=>{
        Request.put(`${config.path}/Incidente`,data)
            .then((result)=>{
                dispatch([
                    {type:"CLEAR_INCIDENT"},
                    {type:"MJSERR_INCIDENT",value:""},
                    {type:"MJSSUCCESS_INCIDENT",value:"Se cargo correctamente"},
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    {type:"MJSSUCCESS_INCIDENT",value:""},
                    {type:"MJSERR_INCIDENT",value:err.response ? err.response.data.err : "no hay conexion"},
                    changeRequestApp(false)
                ])
            });
    }
}

function requestStado() {
    return (dispatch)=>{
        Request.get(`${config.path}/Incidente/Estado`)
            .then((result)=>{
                dispatch([
                    insertError(""),
                    loadSource(result.data),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertError(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}

function getRequestIniciden() {
    return (dispatch)=>{
        Request.get(`${config.path}/Incidente`)
            .then((result)=>{
                dispatch([
                    insertError(""),
                    loadaTable(result.data),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertError(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}