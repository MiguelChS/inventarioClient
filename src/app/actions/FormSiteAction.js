/**
 * Created by mc185249 on 5/9/2017.
 */
import Request from '../Request/Request';
import {changeRequestApp, modalConfimacion} from './appAction';
import {addModal, hiddenModal} from './modalActionV2';
import config from '../config';
import moment from 'moment';
import {formatSite} from '../lib';
import {CambiarRow} from './MisTicketAction';


export function insertGeo(valor) {
    return {
        type:"INSERT_GEO_SITE",
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

export function insertSourceEstado(valor) {
    return {
        type: "INSERT_SOURCE_ESTADO_SITE",
        value: valor
    }
}
export function insertSourceCiudad(valor) {
    return {
        type: "INSERT_SOURCE_CIUDAD_SITE",
        value: valor
    }
}
export function insertSourceCodigoPostal(valor) {
    return {
        type: "INSERT_SOURCE_CODIGO_POSTAL_SITE",
        value: valor
    }
}
export function searchEstado(pais) {
    return function (dispatch) {
        Request.get(`${config.path}/source/geoEstado/${pais}`)
            .then((result) => {
                dispatch([
                    insertSourceEstado(result.data.estado),
                    insertMjsErr(""),
                    changeRequestApp(false)
                ]);
            })
            .catch((err) => {
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}

export function searchCiudad(pais, estado) {
    return function (dispatch) {
        Request.get(`${config.path}/source/geoCiudad/${pais}/${estado}`)
            .then((result) => {
                dispatch([
                    insertSourceCiudad(result.data.ciudad),
                    insertMjsErr(""),
                    changeRequestApp(false)
                ]);
            })
            .catch((err) => {
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}

export function searchCodigoPostal(pais, estado, ciudad) {
    return function (dispatch) {
        Request.get(`${config.path}/source/geoCodigoPostal/${pais}/${estado}/${ciudad}`)
            .then((result) => {
                dispatch([
                    insertSourceCodigoPostal(result.data.codigoPostal),
                    insertMjsErr(""),
                    changeRequestApp(false)
                ]);
            })
            .catch((err) => {
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}


export function insertMjsErr(valor) {
    return {
        type: "INSERT_MJS_ERR_SITE",
        value: valor
    }
}

export function insertMjsSuccess(valor) {
    return {
        type: "INSERT_MJS_SUCCESS_SITE",
        value: valor
    }
}


export function BuscarSitebyLugar(idLugar) {
    return [
        changeRequestApp(true),
        requestBuscarSitebyLugar(idLugar)
    ]
}

export function requestBuscarSitebyLugar(idLugar) {
    return function (dispatch) {
        Request.get(`${config.path}/source/getSitePublic/${idLugar}`)
            .then((result) => {
                dispatch([
                    insertSourceSitePublic(result.data),
                    changeRequestApp(false),
                    insertMjsErr("")
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

export function insertSourceSitePublic(valor) {
    return {
        type: "INSERT_SOURCE_SITE_PUBLIC_POSTAL_SITE",
        value: valor
    }
}


export function clearForm() {
    return{
        type:"CLEAR_FORM_SITE"
    }
}

export function InsertarFormSite(form) {
    let auxClient = `00000${form.idClient.value}`;
    auxClient = `TE${moment().format('YYYYMMDDHHmmss')}${auxClient.substr(auxClient.length - 5, auxClient.length)}`;
    form.siteCountryCode = auxClient;
    return[
        changeRequestApp(true),
        requestInsertarFormSite(formatSite(form))
    ];
}

function requestInsertarFormSite(form) {
    return (dispatch)=>{
        Request.post(`${config.path}/Site`, form)
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


export function BuscarSiteByFiltro() {
    return [
        changeRequestApp(true),
        requestBuscarSiteByFiltro()
    ]
}

export function errorFilter(valor) {
    return {
        type: "MJS_ERR_MODI_SITE",
        value: valor
    }
}

function requestBuscarSiteByFiltro() {
    return (dispatch) => {
        Request.get(`${config.path}/Site/filtro/3`)
            .then((result) => {
                dispatch([
                    changeRequestApp(false),
                    errorFilter(""),
                    {type: "TABLA_MODI_SITE", value: result.data}
                ])
            })
            .catch((err) => {
                dispatch([
                    changeRequestApp(false),
                    errorFilter(err.response ? err.response.data.err : "no hay conexion")
                ])
            })
    }
}


export function BuscarSitebyId(idSite, configModal, error) {
    return [
        changeRequestApp(true),
        requestBuscarSitebyId(idSite, configModal, error)
    ]
}

function formatPrecargar(form) {
    if (form.Lugar.value !== 1) {
        form.SitePublic = {
            value: form.SitePublic,
            label: form.SitePublic,
            "Direccion": form.direccion,
            "Id_Tipo_Lugar": form.Lugar.value,
            "latitud": form.latitud,
            "longitud": form.longitud,
            "offset": form.offset,
            "Id_geo": form.geo.value,
            "pais": form.pais.value,
            "estado": form.estado.label,
            "ciudad": form.ciudad.label,
            "codigo_postal": form.geo.label
        }
    } else {
        delete form.SitePublic
    }
    return form;
}

function requestBuscarSitebyId(idSite, configModal, error) {
    return (dispatch) => {
        Request.get(`${config.path}/Site/${idSite}`)
            .then((result) => {
                dispatch([
                    changeRequestApp(false),
                    error(""),
                    {type: "INSERT_PRE_LOAD_SITE", value: formatPrecargar(result.data)},
                    addModal(configModal)
                ])
            })
            .catch((err) => {
                dispatch([
                    changeRequestApp(false),
                    error(err.response ? err.response.data.err : "no hay conexion")
                ])
            })
    }
}


export function ActulizarSite(form, idModal) {
    return [
        changeRequestApp(true),
        requestActulizarSite(form, idModal)
    ]
}

function ActulizarRowTabla(valor) {
    return {type: "UPDATE_ROW_MODI_SITE", value: valor}
}

function requestActulizarSite(form, idModal) {
    return (dispatch) => {
        let aux = formatSite(form);
        Request.put(`${config.path}/Site/`, aux)
            .then((result) => {
                dispatch([
                    changeRequestApp(false),
                    hiddenModal(idModal),
                    modalConfimacion({
                        mensaje: "Se actulizo correctamente",
                        hidenAcepte: true,
                    }),
                    insertMjsErr(""),
                    ActulizarRowTabla({
                        cliente: form.idClient.label,
                        direccion: aux.direccion,
                        lugar: form.Lugar.label,
                        nombre: form.nombreSite,
                        pendiente_aprobacion: result.data,
                        id: form.id
                    })
                ])
            })
            .catch((err) => {
                dispatch([
                    changeRequestApp(false),
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion")
                ])
            })
    }
}


export function ActuliazarSiteCorreccion(form, idModal) {
    return [
        changeRequestApp(true),
        requestActuliazarSiteCorreccion(form, idModal)
    ]
}

function requestActuliazarSiteCorreccion(form, idModal) {
    return (dispatch) => {
        let aux = formatSite(form);
        Request.put(`${config.path}/Site/correccion/${form.idTicket}`, aux)
            .then((result) => {
                dispatch([
                    changeRequestApp(false),
                    hiddenModal(idModal),
                    modalConfimacion({
                        mensaje: "Se actulizo correctamente",
                        hidenAcepte: true,
                    }),
                    insertMjsErr(""),
                    CambiarRow(form.idTicket)
                ])
            })
            .catch((err) => {
                dispatch([
                    changeRequestApp(false),
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion")
                ])
            })
    }
}