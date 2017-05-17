/**
 * Created by mc185249 on 5/9/2017.
 */
import Request from '../Request/Request';
import { changeRequestApp } from './appAction';
import {noSelect} from './autoCompleteAction';

export function insertNameSite(valor) {
    return {
        type:"INSERT_NAME_SITE_SITE",
        value: valor
    }
}
export function insertDireccion(valor) {
    return {
        type:"INSERT_DIRECCION_SITE",
        value: valor
    }
}
export function insertPhoneSite(valor) {
    return {
        type:"INSERT_PHONE_SITE_SITE",
        value: valor
    }
}
export function insertSiteCode(valor) {
    return {
        type:"INSERT_SITE_CODE_SITE",
        value: valor
    }
}
export function insertGeo(valor) {
    return {
        type:"INSERT_GEO_SITE",
        value: valor
    }
}
export function insertGeoNcr(valor) {
    return {
        type:"INSERT_GEO_NCR_SITE",
        value: valor
    }
}
export function insertKmNcr(valor) {
    return {
        type:"INSERT_KM_NCR_SITE",
        value: valor
    }
}
export function insertLatitud(valor) {
    return {
        type:"INSERT_LATITUD_SITE",
        value: valor
    }
}
export function insertLongitud(valor) {
    return {
        type:"INSERT_LONGITUD_SITE",
        value: valor
    }
}
export function insertOffSet(valor) {
    return {
        type:"INSERT_OFFSET_SITE",
        value: valor
    }
}
export function insertTypeDireccion(valor) {
    return {
        type:"INSERT_TYPE_DIRECCION_SITE",
        value: valor
    }
}
export function insertPreCarga(valor) {
    return {
        type:"INSERT_PRE_LOAD_SITE",
        value: valor
    }
}

export function insertPais(valor) {
    let actionDispach = {
        type:"INSERT_PAIS_SITE",
        value: valor
    };
    //verificamos que el value sea null
    if(!valor || !valor.value) return [
        //limpiamos el estado ciudad y codigo postal
        actionDispach,
            insertEstado(null)
        ];

    return [
        actionDispach,
        changeRequestApp(true),
        searchEstado(valor.value)
    ]
}

export function insertEstado(valor,pais) {
    let actionDispach = {
        type:"INSERT_ESTADO_SITE",
        value: valor
    };
    //verificamos si es null esl value
    if(!valor || !valor.value) return [
        //limpiamos ciudad
        actionDispach,
        insertCiudad(null)
    ];

    return [
        actionDispach,
        changeRequestApp(true),
        searchCiudad(pais,valor.value)
    ]
}

export function insertCiudad(valor,pais,estado) {
    let actionDispach = {
        type:"INSERT_CIUDAD_SITE",
        value: valor
    };
    if(!valor || !valor.value) return [
        actionDispach,
        insertGeo(null)
    ];

    return [
        actionDispach,
        changeRequestApp(true),
        searchCodigoPostal(pais,estado,valor.value),
        insertGeo(null)
    ]
}
export function insertMjsErr(valor) {
    return {
        type:"INSERT_MJS_ERR_SITE",
        value: valor
    }
}
export function insertSourceEstado(valor) {
    return {
        type:"INSERT_SOURCE_ESTADO_SITE",
        value: valor
    }
}
export function insertSourceCiudad(valor) {
    return {
        type:"INSERT_SOURCE_CIUDAD_SITE",
        value: valor
    }
}
export function insertSourceCodigoPostal(valor) {
    return {
        type:"INSERT_SOURCE_CODIGO_POSTAL_SITE",
        value: valor
    }
}
export function searchEstado(pais) {
    return function(dispatch) {
        Request.get(`http://localhost:4000/api/geoEstado/${pais}`)
            .then((result)=>{
                dispatch([
                    insertSourceEstado(result.data.estado),
                    insertMjsErr(""),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}
export function searchCiudad(pais,estado) {
    return function(dispatch) {
        Request.get(`http://localhost:4000/api/geoCiudad/${pais}/${estado}`)
            .then((result)=>{
                dispatch([
                    insertSourceCiudad(result.data.ciudad),
                    insertMjsErr(""),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}
export function searchCodigoPostal(pais,estado,ciudad) {
    return function(dispatch) {
        Request.get(`http://localhost:4000/api/geoCodigoPostal/${pais}/${estado}/${ciudad}`)
            .then((result)=>{
                dispatch([
                    insertSourceCodigoPostal(result.data.codigoPostal),
                    insertMjsErr(""),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}

export function clearForm() {
    return{
        type:"CLEAR_FORM_SITE"
    }
}