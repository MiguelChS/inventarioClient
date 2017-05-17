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