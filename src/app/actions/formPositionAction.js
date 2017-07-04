/**
 * Created by mc185249 on 3/27/2017.
 */
import Request from '../Request/Request';
import { changeRequestApp } from './appAction';
import config from '../config';
import { formatPosicion } from '../lib'

export function insertNombrePosicion(valor) {
    return {
        type:"INSERT_NOMBRE_POSICION_POS",
        value:valor
    }
}

export function insertNCR(valor) {
    return {
        type:"INSERT_NCR_POS",
        value:valor
    }
}

export function insertIP(valor) {
    return {
        type:"INSERT_IP_POS",
        value:valor
    }
}

export function insertSite(valor) {
    return {
        type:"INSERT_SITE_POS",
        value:valor
    };
}

export function insertSiteClient(valor) {
    let action = {
        type:"INSERT_SITE_CLIENT_POS",
        value:valor
    };

    if(!valor || !valor.value){
        return[
            action,
            insertEquipo(null),
            insertSourceEquipo([])
        ]
    }

    return [
        action,
        insertEquipo(null),
        //changeRequestApp(true),
        insertSourceEquipo([]),
        //getEquipos(valor)
    ];
}

export function insertGaveta(valor) {
    return {
        type:"INSERT_GAVETA_POS",
        value:valor
    }
}

export function insertTableStatus(valor) {
    return {
        type:"INSERT_TABLE_STATUS_POS",
        value:valor
    }
}

export function insertScript(valor) {
    return {
        type:"INSERT_SCRIPT_POS",
        value:valor
    }
}

export function insertCommand(valor) {
    return {
        type:"INSERT_COMMAND_POS",
        value:valor
    }
}

export function insertEquipo(valor,source) {
    let action = {
        type:"INSERT_EQUIPO_POS",
        value:valor
    };

    if(!valor || !valor.value){
        return [
            action,
            primeraCargaHoraPrestacion([])
        ];
    }

    return [
        action,
        insertHourPrestacion([]),
        changeRequestApp(true),
        searchPrestacionEquipo(valor,source)
    ];
}

export function insertCommunityString(valor) {
    return{
        type:"INSERT_COMMUNITY_STRING_POS",
        value:valor
    }
}

export function insertComunicacion(valor) {
    return {
        type:"INSERT_COMUNICACION_POS",
        value:valor
    }
}

export function insertSLM(valor) {
    return {
        type:"INSERT_SLM_POS",
        value:valor
    }
}

export function insertFLM(valor) {
    return {
        type:"INSERT_FLM_POS",
        value:valor
    }
}

export function insertPRESTACION(valor) {
    return {
        type:"INSERT_PRESTACION_POS",
        value:valor
    }
}

export function insertHourPrestacion(valor) {
    return {
        type:"INSERT_HOUR_PRESTACION_POS",
        value:valor
    }
}

export function insertUbicacion(valor) {
    return {
        type:"INSERT_UBICACION_POS",
        value:valor
    }
}

export function insertHourBranch(valor) {
    return {
        type:"INSERT_HOUR_BRANCH_POS",
        value:valor
    }
}

export function insertHourOperation(valor) {
    return {
        type:"INSERT_HOUR_OPERATION_POS",
        value:valor
    }
}

export function insertHourSLA(valor) {
    return {
        type:"INSERT_HOUR_SLA_POS",
        value:valor
    }
}

export function insertHourAccess(valor) {
    return {
        type:"INSERT_HOUR_ACCESS_POS",
        value:valor
    }
}

export function insertHourPeak(valor) {
    return {
        type:"INSERT_HOUR_PEAK_POS",
        value:valor
    }
}

export function primeraCargaHoraPrestacion(valor,source) {
    //buscamos las fuente de datos q machee con los IdVentanas
    let primeraCargaPrestacion = valor.map((obj)=>{
        return {...source.find(ventH => ventH.value == obj.idVentanaHoraria)}
    });

    return {
        type:"INSERT_PRIMERA_CARGA_HOUR_PRESTACION_POS",
        value:primeraCargaPrestacion
    }
}

export function insertMjsErr(valor) {
    return {
        type:"INSERT_mjsErr_POS",
        value:valor
    }
}

export function insertMjsSuccess(valor) {
    return {
        type:"INSERT_mjsSuccess_POS",
        value:valor
    }
}

export function insertSourceSite(valor) {
    return {
        type:"INSERT_SOURCE_SITE_POS",
        value:valor
    }
}

export function insertSourceSiteClient(valor) {
    return {
        type:"INSERT_SOURCE_SITE_CLIENT_POS",
        value:valor
    }
}

export function insertSourceEquipo(valor) {
    return {
        type:"INSERT_SOURCE_EQUIPO_POS",
        value:valor
    }
}

export function preLoadFormulario(valor) {
    return {
        type:"PRE_LOAD_FORM_POS",
        value:valor
    }
}

export function searchPrestacionEquipo(data,source) {
    return function(dispatch) {
        Request.get(`${config.path}/prestacionEquipo/${data.value}`)
            .then((result)=>{
                dispatch([
                    primeraCargaHoraPrestacion(result.data,source),
                    changeRequestApp(false),
                    insertMjsErr("")
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion, no se pudo encontrar las prestaciones del equipo"),
                    changeRequestApp(false)
                ])
            });
    }
}

export function insertCliente(valor) {
    let action = {
        type:"INSERT_CLIENTE_POS",
        value:valor
    };
    if(!valor || !valor.value){
        return[
            action,
            insertSite(null),
            insertSourceSite([])
        ]
    }

    return[
        action,
        changeRequestApp(true),
        insertSite(null),
        insertSourceSite([]),
        getSite(valor)
    ]
}

export function getSite(data) {
    return function(dispatch) {
        Request.get(`${config.path}/site/${data.value}`)
            .then((result)=>{
                dispatch([
                    insertSourceSite(result.data),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false)
                ])
            });
    }
}

export function getSiteClient(data) {
    return function(dispatch) {
        Request.get(`${config.path}/siteClient/${data.value}`)
            .then((result)=>{
                dispatch([
                    insertSourceSiteClient(result.data),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false)
                ])
            });
    }
}

export function getEquipos(data) {
    return function(dispatch) {
        Request.get(`${config.path}/equipo/${data.value}`)
            .then((result)=>{
                dispatch([
                    insertSourceEquipo(result.data),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false)
                ])
            });
    }
}

export function clearForm() {
    return{
        type:"CLEAN_FORM_POS"
    }
}

export function sendFormulario(data) {
    return[
        changeRequestApp(true),
        enviandoFormulario(formatPosicion(data))
    ]
}

function enviandoFormulario(form) {
    return function(dispatch) {
        Request.customize({
            method: 'POST',
            url: `${config.path}/Posicion`,
            data: form,
            headers: {
                'Content-Type': "application/json",
                'Authorization':localStorage.getItem("token")
            },
            json: true
        })
            .then(()=>{
                dispatch([
                    clearForm(),
                    changeRequestApp(false),
                    insertMjsSuccess("Se cargo Correctamente")
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertMjsSuccess(""),
                    changeRequestApp(false),
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion")
                ])
            });
    }
}