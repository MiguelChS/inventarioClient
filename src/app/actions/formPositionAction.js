/**
 * Created by mc185249 on 3/27/2017.
 */
import Request from '../Request/Request';
import { changeRequestApp } from './appAction';

export function insertClient(valor) {
    return {
        type:"INSERT_CLIENT_POS",
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
    let action = {
        type:"INSERT_SITE_POS",
        value:valor
    };

    if(!valor || !valor.value){
        return[
            action,
            insertSiteClient(null),
            insertSourceSiteClient([])
        ]
    }

    return [
        action,
        insertSiteClient(null),
        changeRequestApp(true),
        insertSourceSiteClient([]),
        getSiteClient(valor)
    ];
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
        changeRequestApp(true),
        insertSourceEquipo([]),
        getEquipos(valor)
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

export function insertEquipo(valor) {
    let action = {
        type:"INSERT_EQUIPO_POS",
        value:valor
    };

    if(!valor || !valor.value){
        return [
            action,
            insertIdPrestaciones([]),
            removeHourPrestacion(),
            insertHourPrestacion()
        ];
    }

    return [
        action,
        insertIdPrestaciones([]),
        changeRequestApp(true),
        removeHourPrestacion(),
        searchPrestacionEquipo(valor)
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

export function removeHourPrestacion() {
    return {
        type:"CLEAR_HOURPRESTACION_POS"
    }
}

export function insertHourPrestacion(valor,store) {
    let auxHoraPres = [];
    if(valor){
        let auxPres = store.hourPrestacion.find(obj => obj.idHora == valor.idHora);
        auxHoraPres = [...store.hourPrestacion];
        if(auxPres){
            if(valor.hora){
                //update
                auxHoraPres = auxHoraPres.map(obj=>{
                    if(obj.idHora == valor.idHora){
                        obj.hora = valor.hora[valor.idHora];
                    }
                    return obj;
                });
            }else{
                //remove
                auxHoraPres = auxHoraPres.filter(fil=>fil.idHora != valor.idHora);
            }
        }else{
            //insert
            auxHoraPres.push({
                idHora:valor.idHora,
                hora:valor.hora[valor.idHora]
            });
        }
    }
    return {
        type:"INSERT_HOURPRESTACION_POS",
        value:auxHoraPres
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

export function insertIdPrestaciones(valor) {
    return {
        type:"INSERT_ID_PRESTACION_POS",
        value:valor
    }
}

export function insertMjsErr(valor) {
    return {
        type:"INSERT_mjsErr_POS",
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

export function searchPrestacionEquipo(data) {
    return function(dispatch) {
        Request.get(`http://localhost:4000/api/prestacionEquipo/${data.value}`)
            .then((result)=>{
                dispatch([
                    insertIdPrestaciones(result.data),
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

export function insertInstitucion(valor) {
    let action = {
        type:"INSERT_INSTITUCION_POS",
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
        Request.get(`http://localhost:4000/api/site/${data.value}/${data.origen}`)
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
        Request.get(`http://localhost:4000/api/siteClient/${data.value}`)
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
        Request.get(`http://localhost:4000/api/equipo/${data.value}`)
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