/**
 * Created by mc185249 on 3/27/2017.
 */
import Request from '../Request/Request';

export function addFormPos(valor) {
    return {
        type:"ADD_FORM_POS",
        value: valor
    }
}

export function insertClient(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_CLIENT_POS",
            value:valor
        }
    }
}

export function insertNCR(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_NCR_POS",
            value:valor
        }
    }
}

export function insertIP(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_IP_POS",
            value:valor
        }
    }
}

export function insertSite(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_SITE_POS",
            value:valor
        }
    }
}

export function insertGaveta(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_GAVETA_POS",
            value:valor
        }
    }
}

export function insertTableStatus(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_TABLE_STATUS_POS",
            value:valor
        }
    }
}

export function insertScript(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_SCRIPT_POS",
            value:valor
        }
    }
}

export function insertCommand(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_COMMAND_POS",
            value:valor
        }
    }
}

export function insertEquipo(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_EQUIPO_POS",
            value:valor
        }
    }
}

export function insertCommunityString(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_COMMUNITY_STRING_POS",
            value:valor
        }
    }
}

export function insertComunicacion(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_COMUNICACION_POS",
            value:valor
        }
    }
}

export function insertSLM(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_SLM_POS",
            value:valor
        }
    }
}

export function insertFLM(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_FLM_POS",
            value:valor
        }
    }
}

export function insertPRESTACION(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_PRESTACION_POS",
            value:valor
        }
    }
}

export function insertHourPrestacion(valor,store) {
    let auxPres = store.hourPrestacion.find(obj => obj.idHora == valor.idHora);
    let auxHoraPres = [...store.hourPrestacion];
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
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_HOURPRESTACION_POS",
            value:{
                id:store.id,
                value:auxHoraPres
            }
        }
    }
}

export function insertUbicacion(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_UBICACION_POS",
            value:valor
        }
    }
}

export function insertHourBranch(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_HOUR_BRANCH_POS",
            value:valor
        }
    }
}

export function insertHourOperation(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_HOUR_OPERATION_POS",
            value:valor
        }
    }
}

export function insertHourSLA(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_HOUR_SLA_POS",
            value:valor
        }
    }
}

export function insertHourAccess(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_HOUR_ACCESS_POS",
            value:valor
        }
    }
}

export function insertHourPeak(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_HOUR_PEAK_POS",
            value:valor
        }
    }
}

export function insertIdPrestaciones(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_ID_PRESTACION_POS",
            value:valor
        }
    }
}

export function insertStateRequtes(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_REQUEST_PRESTACION_POS",
            value:valor
        }
    }
}
export function removeFormPost(valor) {
    return {
        type:"REMOVE_FORM_POS",
        value:valor
    }
}

export function insertMjsErr(valor) {
    return {
        type:"INSERT_FORM_POST",
        value:{
            type:"INSERT_mjsErr_POS",
            value:valor
        }
    }
}

export function searchPrestacionEquipo(formId,idEquipo) {
    return function(dispatch) {
        Request.get(`http://localhost:4000/api/prestacionEquipo/${idEquipo}`)
            .then((result)=>{
                dispatch([
                    insertIdPrestaciones({id:formId,value:result.data}),
                    insertStateRequtes({id:formId,value:false}),
                    insertMjsErr({id:formId,value:""})
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertMjsErr({id:formId,value:err.response ? err.response.data.err : "no hay conexion"}),
                    insertStateRequtes({id:formId,value:false}),
                ])
            });
    }
}