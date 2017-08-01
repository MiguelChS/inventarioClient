import React from 'react';
import Request from '../Request/Request';
import {changeRequestApp, modalConfimacion} from './appAction';
import config from '../config';
import {formatPosicion} from '../lib'
import {addModal, hiddenModal} from './modalActionV2';
import ModalPosicion from '../components/page/posicion/alta/ModalPosicion';
import {CambiarRow} from './MisTicketAction';

export function insertMjsErr(valor) {
    return {
        type: "INSERT_mjsErr_POS",
        value: valor
    }
}

export function insertMjsSuccess(valor) {
    return {
        type: "INSERT_mjsSuccess_POS",
        value: valor
    }
}

export function preLoadFormulario(valor) {
    return {
        type: "PRE_LOAD_FORM_POS",
        value: valor
    }
}

export function clearForm() {
    return {
        type: "CLEAN_FORM_POS"
    }
}


export function sendFormulario(data) {
    return [
        changeRequestApp(true),
        enviandoFormulario(formatPosicion(data))
    ]
}

function enviandoFormulario(form) {
    return function (dispatch) {
        Request.post(`${config.path}/Posicion`, form)
            .then(() => {
                dispatch([
                    clearForm(),
                    changeRequestApp(false),
                    insertMjsSuccess("Se cargo Correctamente")
                ]);
            })
            .catch((err) => {
                dispatch([
                    insertMjsSuccess(""),
                    changeRequestApp(false),
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion")
                ])
            });
    }
}


export function buscarPosicion(param) {
    return [
        changeRequestApp(true),
        requestBuscarPosiciones(param)
    ]
}

function requestBuscarPosiciones(param) {
    return function (dispatch) {
        let cliente = param.cliente && param.cliente.value ? param.cliente.value : null;
        let site = param.site && param.site.value ? param.site.value : null;
        let posicion = param.posicion ? param.posicion : null;
        let tipoSite = param.tipoSite ? param.tipoSite.value : null;
        Request.get(`${config.path}/posicion/${cliente}/${site}/${posicion}/${tipoSite}`)
            .then((result) => {
                dispatch([
                    changeRequestApp(false),
                    {type: "LOAD_TABLA_POS_EDIT", value: result.data},
                    {type: "MJSERR_POS_EDIT", value: ""},
                ]);
            })
            .catch((err) => {
                dispatch([
                    changeRequestApp(false),
                    {type: "MJSERR_POS_EDIT", value: err.response ? err.response.data.err : "no hay conexion"},
                ])
            });
    }
}


export function mjsErrPosicionEdit(valor) {
    return {type: "MJSERR_POS_EDIT", value: valor}
}

export function BuscarPosicionById(idPosicion, error, data) {
    return [
        changeRequestApp(true),
        requestBuscarPosicion(idPosicion, error, data)
    ]
}

function mergeHorarios(arrayData, tipo) {
    let arrayResult = [];
    switch (tipo) {
        case 1: {
            //branch Hour
            arrayResult = arrayData.filter(x => x.idHora === 2 || x.idHora === 1 || x.idHora === 4);
            if (arrayResult.length < 3) {
                if (!arrayResult.find(x => x.idHora === 2)) arrayResult.push({idHora: 2, hora: null});
                if (!arrayResult.find(x => x.idHora === 1)) arrayResult.push({idHora: 1, hora: null});
                if (!arrayResult.find(x => x.idHora === 4)) arrayResult.push({idHora: 4, hora: null});
            }
            break;
        }
        case 2: {
            //hora operacion
            arrayResult = arrayData.filter(x => x.idHora === 3);
            if (!arrayResult.length) {
                arrayResult.push({idHora: 3, hora: null})
            }
            break;
        }
        case 3: {
            //sla
            arrayResult = arrayData.filter(x => x.idHora === 7);
            if (!arrayResult.length) {
                arrayResult.push({idHora: 7, hora: null})
            }
            break;
        }
        case 4: {
            //access
            arrayResult = arrayData.filter(x => x.idHora === 8);
            if (!arrayResult.length) {
                arrayResult.push({idHora: 8, hora: null})
            }
            break;
        }
        case 5: {
            //hour peak
            arrayResult = arrayData.filter(x => x.idHora === 6 || x.idHora === 5);
            if (arrayResult.length < 2) {
                if (!arrayResult.find(x => x.idHora === 6)) arrayResult.push({idHora: 6, hora: null});
                if (!arrayResult.find(x => x.idHora === 5)) arrayResult.push({idHora: 5, hora: null});
            }
            break;
        }
        case 6: {
            //prestaciones
            arrayResult = arrayData.filter(x => x.idHora > 8);
            break;
        }
    }

    return arrayResult.sort((a, b) => {
        return a.idHora - b.idHora
    });
}

function cargarFormulario(data) {
    data.hourBranch = mergeHorarios(data.Horarios, 1);
    data.hourOperation = mergeHorarios(data.Horarios, 2);
    data.sla = mergeHorarios(data.Horarios, 3);
    data.access = mergeHorarios(data.Horarios, 4);
    data.hourPeak = mergeHorarios(data.Horarios, 5);
    data.horaPrestacion = mergeHorarios(data.Horarios, 6);
    delete data.Horarios;
    return preLoadFormulario(data)
}

function requestBuscarPosicion(idPosicion, error, data) {
    return (dispatch) => {
        Request.get(`${config.path}/posicion/edit/${idPosicion}`)
            .then((result) => {
                dispatch([
                    changeRequestApp(false),
                    cargarFormulario(result.data),
                    error(""),
                    addModal({
                        body: ModalPosicion,
                        size: "xl",
                        data: data
                    })
                ]);
            })
            .catch((err) => {
                dispatch([
                    changeRequestApp(false),
                    error(err.response ? err.response.data.err : "no hay conexion")
                ])
            });
    }
}


export function ActulizarPosicion(form, idModal) {
    return [
        changeRequestApp(true),
        requestActulizarPosicion(formatPosicion(form), idModal)
    ]
}

function requestActulizarPosicion(form, idModal) {
    return (dispatch) => {
        Request.put(`${config.path}/Posicion`, form)
            .then(() => {
                dispatch([
                    clearForm(),
                    hiddenModal(idModal),
                    modalConfimacion({
                        mensaje: "Se actulizo correctamente",
                        hidenAcepte: true,
                    }),
                    changeRequestApp(false)
                ]);
            })
            .catch((err) => {
                dispatch([
                    changeRequestApp(false),
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion")
                ])
            });
    }
}


export function ActulizarPosicionIncidente(form, idModal) {
    return [
        changeRequestApp(true),
        requestActulizarPosicionIncidente(form, idModal)

    ]
}

function requestActulizarPosicionIncidente(form, idModal) {
    return (dispatch) => {
        Request.put(`${config.path}/Posicion/Incidente/${form.idTicket}`, formatPosicion(form))
            .then(() => {
                dispatch([
                    clearForm(),
                    hiddenModal(idModal),
                    modalConfimacion({
                        mensaje: "Se actulizo correctamente",
                        hidenAcepte: true,
                    }),
                    changeRequestApp(false),
                    CambiarRow(form.idTicket)
                ]);
            })
            .catch((err) => {
                dispatch([
                    insertMjsSuccess(""),
                    changeRequestApp(false),
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion")
                ])
            });
    }
}
