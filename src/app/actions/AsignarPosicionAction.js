import Request from '../Request/Request';
import { changeRequestApp } from './appAction';

export function insertSite(valor) {
    let action = {
        type:"INSERT_SITE_ASSIGN_POSICION",
        value: valor
    };

    if(!valor || !valor.value){
        return[
            action,
            insertPosicion(null),
            insertSourcePosicion([])
        ]
    }

    return [
        action,
        insertPosicion(null),
        changeRequestApp(true),
        insertSourcePosicion([]),
        getPosicion(valor)
    ];
}

export function insertPosicion(valor) {
    return {
        type:"INSERT_POSICION_ASSIGN_POSICION",
        value: valor
    }
}
export function insertSourceSite(valor) {
    return {
        type:"INSERT_SOURCE_SITE_ASSIGN_POSICION",
        value: valor
    }
}

export function insertSourcePosicion(valor) {
    return {
        type:"INSERT_SOURCE_POSICION_ASSIGN_POSICION",
        value: valor
    }
}
export function insertHoraPrestacion(valor) {
    return {
        type:"INSERT_HORA_PRESTACION_ASSIGN_POSICION",
        value: valor
    }
}

export function clearForm() {
    return {
        type:"CLEAN_FORMULARIO_ASSIGN_POSICION",
    }
}
export function insertNuevaPosicion(valor) {
    return [
        {
            type:"INSERT_INSERT_NEW_POSICION_ASSIGN_POSICION",
            value: valor
        },
        insertPosicion(null)
    ]
}
export function preCargarHoraPrestacion(valor) {
    return {
        type:"PRE_CARGAR_HORA_PRESTACION_ASSIGN_POSICION",
        value: valor
    }
}

export function preCargaFormulario(form) {
    let Site = null;
    let Posicion = null;
    if(form.site.value != 0){
        Site = form.site;
        Posicion = form.position;
    }
    return[
        preCargarHoraPrestacion(form.prestacion),
        insertNuevaPosicion(form.newPosicion),
        insertSite(Site),
        insertPosicion(Posicion),
        changeRequestApp(true),
        getSite(form.cliente)
    ]
}

export function getSite(data) {
    return function(dispatch) {
        Request.get(`http://localhost:4000/api/site/${data.value}`)
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

export function getPosicion(data) {
    return function(dispatch) {
        Request.get(`http://localhost:4000/api/posicion/${data.value}`)
            .then((result)=>{
                dispatch([
                    insertSourcePosicion(result.data),
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