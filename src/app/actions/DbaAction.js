/**
 * Created by mc185249 on 7/12/2017.
 */
import Request from '../Request/Request';
import {changeRequestApp, modalConfimacion} from './appAction';
import {hiddenModal} from './modalActionV2';
import config from '../config';

export function getIncientes() {
    return[
        changeRequestApp(true),
        getRequestIniciden()
    ]
}

function getRequestIniciden() {
    return (dispatch) => {
        Request.get(`${config.path}/Incidente`)
            .then((result) => {
                dispatch([
                    insertError(""),
                    loadaTable(result.data),
                    changeRequestApp(false)
                ]);
            })
            .catch((err) => {
                dispatch([
                    insertError(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
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

export function changeEstado(data, idModal) {
    return [
        changeRequestApp(true),
        requestChangeState(data, idModal)
    ]
}

function requestChangeState(data, idModal) {
    return (dispatch)=>{
        Request.put(`${config.path}/Incidente`,data)
            .then((result)=>{
                dispatch([
                    {type:"CLEAR_INCIDENT"},
                    {type:"MJSERR_INCIDENT",value:""},
                    hiddenModal(idModal),
                    modalConfimacion({
                        mensaje: "Se Cambio Correctamente",
                        hidenAcepte: true,
                    }),
                    changeRequestApp(false),
                    {
                        type: "CAMBIAR_ROW_DBA", value: {
                        id: data.id,
                        id_estado: data.id_estado
                    }
                    }
                ]);
            })
            .catch((err)=>{
                dispatch([
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

