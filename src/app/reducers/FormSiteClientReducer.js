/**
 * Created by mc185249 on 5/11/2017.
 */
let init={
    //site Cliente
    nombreSiteClient:"",//input
    tipoSiteClient:null,//select
    geoClient:null,//autoComplete
    telefono1:"",//input
    telefono2:"",//input
    telefono3:"",//input
    idSite:null,//autoComplete,
    sourceSite:[],
    institucion:null,
    newSite:null,
};

function reducer(state = init,action) {
    switch (action.type){
        case "INSERT_NAME_SITE_CLIENT":{
            return {...state,nombreSiteClient:action.value}
        }
        case "INSERT_TIPO_SITE_CLIENT":{
            return {...state,tipoSiteClient:action.value}
        }
        case "INSERT_INSTITUCION_SITE_CLIENT":{
            return {...state,institucion:action.value}
        }
        case "INSERT_GEO_SITE_CLIENT":{
            return {...state,geoClient:action.value}
        }
        case "INSERT_SOURCE_SITE":{
            return {...state,sourceSite:action.value}
        }
        case "INSERT_PHONE_1_SITE_CLIENT":{
            return {...state,telefono1:action.value}
        }
        case "INSERT_PHONE_2_SITE_CLIENT":{
            return {...state,telefono2:action.value}
        }
        case "INSERT_PHONE_3_SITE_CLIENT":{
            return {...state,telefono3:action.value}
        }
        case "INSERT_ID_SITE_SITE_CLIENT":{
            return {...state,idSite:action.value}
        }
        case "INSERT_NEW_SITE_SITE_CLIENT":{
            return {...state,newSite:action.value}
        }
        case "CLEAR_FORM_SITE_CLIENT":{
            return {...state,...init}
        }
        default:
            return state;
    }
}

export default reducer;