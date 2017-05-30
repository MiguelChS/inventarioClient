import Request from '../Request/Request';
import { changeRequestApp } from './appAction';
import { noSelect } from './autoCompleteAction'


export function insertNameSiteClient(valor) {
    return {
        type:"INSERT_NAME_SITE_CLIENT",
        value: valor
    }
}
export function insertTipoSite(valor) {
    return {
        type:"INSERT_TIPO_SITE_CLIENT",
        value: valor
    }
}
export function insertGeoClient(valor) {
    return {
        type:"INSERT_GEO_SITE_CLIENT",
        value: valor
    }
}
export function insertPhone1(valor) {
    return {
        type:"INSERT_PHONE_1_SITE_CLIENT",
        value: valor
    }
}
export function insertPhone2(valor) {
    return {
        type:"INSERT_PHONE_2_SITE_CLIENT",
        value: valor
    }
}
export function insertPhone3(valor) {
    return {
        type:"INSERT_PHONE_3_SITE_CLIENT",
        value: valor
    }
}
export function insertIdSite(valor) {
    return {
        type:"INSERT_ID_SITE_SITE_CLIENT",
        value: valor
    }
}
export function insertNuevoSIte(valor) {
    return [
        insertIdSite(null),
        {
            type:"INSERT_NEW_SITE_SITE_CLIENT",
            value: valor
        }
    ]
}
export function clearForm() {
    return {
        type:"CLEAR_FORM_SITE_CLIENT",
    }
}

export function insertSourceSite(valor) {
    return {
        type:"INSERT_SOURCE_SITE",
        value:valor
    }
}

export function insertInstitucion(valor) {
    let action = {
        type: "INSERT_INSTITUCION_SITE_CLIENT",
        value: valor
    };
    if(!valor || !valor.value){
        return[
            action,
            insertIdSite(null),
            insertSourceSite([])
        ]
    }

    return[
        action,
        changeRequestApp(true),
        insertIdSite(null),
        insertSourceSite([]),
        getSite(valor)
    ];
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

export function sendFormulario(data) {
    return[
        changeRequestApp(true),
        enviandoFormulario(formatFormulario(data))
    ]
}
function formatFormulario(form) {
    let nuevoSite = form.newSite;
    return {
        "nombre_site":form.nombreSiteClient,
        "id_tipo_site":form.tipoSiteClient.value,
        "id_geo_cliente":form.geoClient.value,
        "telefono1":form.telefono1,
        "telefono2":form.telefono1,
        "telefono3":form.telefono1,
        "id_inv_site":form.idSite ? form.idSite.value : null,
        "id_user":0,
        "new_site":!nuevoSite ? null : {
            "id_cliente":form.institucion.value,
            "nombre_site_id":nuevoSite.nombreSite,
            "direccion":nuevoSite.direccion,
            "telefono":nuevoSite.telefonoSite,
            "site_code":nuevoSite.siteCode,
            "id_geo":nuevoSite.geo.value,
            "id_geo_ncr":nuevoSite.geoNcr.value,
            "km_ncr":parseInt(nuevoSite.kmNcr,10),
            "latitud":nuevoSite.latitud,
            "longitud":nuevoSite.longitud,
            "offset":nuevoSite.offset,
            "id_tipo_direccion":nuevoSite.idTipoDireccion.value
        }
    }
}

function insertMjsErr(valor) {
    return {
        type:"INSERT_MjsErr_SITE_CLIENT",
        value:valor
    }
}

function enviandoFormulario(form) {
    return function(dispatch) {
        Request.customize({
            method: 'POST',
            url: 'http://localhost:4000/api/Site',
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
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false),
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion")
                ])
            });
    }
}