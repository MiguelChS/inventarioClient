/**
 * Created by mc185249 on 5/9/2017.
 */
import Request from '../Request/Request';
import { changeRequestApp } from './appAction';
import config from '../config';


export function insertNameSite(valor) {
    return {
        type:"INSERT_NAME_SITE_SITE",
        value: valor
    }
}
export function insertClient(valor) {
    return {
        type:"INSERT_CLIENT_SITE",
        value: valor
    }
}
export function insertTipoSite(valor) {
    return {
        type:"INSERT_TYPE__SITE",
        value: valor
    }
}

export function insertGeoClient(valor) {
    return {
        type:"INSERT_GEO_CLIENT_SITE",
        value: valor
    }
}
export function insertTelefono1(valor) {
    return {
        type:"INSERT_PHONE1_SITE",
        value: valor
    }
}

export function insertTelefono2(valor) {
    return {
        type:"INSERT_PHONE2_SITE",
        value: valor
    }
}

export function insertTelefono3(valor) {
    return {
        type:"INSERT_PHONE3_SITE",
        value: valor
    }
}


export function insertDireccion(valor) {
    return {
        type:"INSERT_DIRECCION_SITE",
        value: valor
    }
}
export function insertGeo(valor) {
    return {
        type:"INSERT_GEO_SITE",
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

export function insertMjsSuccess(valor) {
    return {
        type:"INSERT_MJS_SUCCESS_SITE",
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
        Request.get(`${config.path}/geoEstado/${pais}`)
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
        Request.get(`${config.path}/geoCiudad/${pais}/${estado}`)
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
        Request.get(`${config.path}/geoCodigoPostal/${pais}/${estado}/${ciudad}`)
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
export function insertLugar(valor){
    let action ={
        type:"INSERT_LUGAR_SITE",
        value:valor
    };
    if(!valor || valor.value == 1) return [
        action,
        insertSitePublic(null),
        insertMjsSuccess(""),
        insertSourceSitePublic([])
    ];

    return[
        action,
        insertMjsSuccess(""),
        insertSitePublic(null),
        insertSourceSitePublic([]),
        changeRequestApp(true),
        getSitePublic(action.value)
    ]
}
export function insertSitePublic(valor){
    return {
        type:"INSERT_SITE_PUBLIC_SITE",
        value:valor
    }
}
export function insertSourceSitePublic(valor){
    return {
        type:"INSERT_SOURCE_SITE_PUBLIC_POSTAL_SITE",
        value:valor
    }
}
export function getSitePublic(data) {
    return function(dispatch) {
        Request.get(`${config.path}/getSitePublic/${data.value}`)
            .then((result)=>{
                dispatch([
                    insertSourceSitePublic(result.data),
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
        type:"CLEAR_FORM_SITE"
    }
}

export function enviarFormulario(form) {
    return[
        changeRequestApp(true),
        requestFormulario({
            nombreSite:form.nombreSite,
            nombrePublic:form.SitePublic ? form.SitePublic.value : null,
            idTipoLugar:form.Lugar.value,
            direction:form.SitePublic ? form.SitePublic.Direccion : form.direccion,
            telefono1:form.telefono1,
            telefono2:form.telefono2,
            telefono3:form.telefono3,
            idGeo:form.SitePublic ? form.SitePublic.Id_geo : form.geo.value,
            idGeoClient:form.geoClient.value,
            idClient:form.idClient.value,
            idTipoSite:form.idTipoSite.value,
            latitud:form.SitePublic ? form.SitePublic.latitud : form.latitud,
            longitud:form.SitePublic ? form.SitePublic.longitud : form.longitud,
            offSet:form.SitePublic ? form.SitePublic.offset : form.offset
        })
    ]
}

function requestFormulario(form) {
    return (dispatch)=>{
        Request.customize({
            method: 'POST',
            url: `${config.path}/Site`,
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
                    insertMjsSuccess("Se cargar correctamente")
                ])
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false),
                    insertMjsSuccess(""),
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion")
                ])
            })
    }
}