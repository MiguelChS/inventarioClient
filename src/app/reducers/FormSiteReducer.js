/**
 * Created by mc185249 on 5/9/2017.
 */
let init={
    nombreSite:"",//input
    direccion:"",//input
    telefonoSite:"",//input
    siteCode:"",//input
    geo:null,//autoComplete
    geoNcr:null,//autoComplete
    kmNcr:null,//input
    latitud:"",//input
    longitud:"",//input
    offset:"",//input
    idTipoDireccion:null,//select
    //comportamiento propio del formulario
    pais:null, //autoComplete
    estado:null,//autoComplete
    ciudad:null,//autoComplete
    sourceEstado:[],
    sourceCiudad:[],
    sourceCodigoPostal:[],
    msjErr:"",
};

function reducer (state=init,action){
    switch (action.type){
        case "INSERT_NAME_SITE_SITE":{
            return {...state,nombreSite:action.value}
        }
        case "INSERT_DIRECCION_SITE":{
            return {...state,direccion:action.value}
        }
        case "INSERT_PHONE_SITE_SITE":{
            return {...state,telefonoSite:action.value}
        }
        case "INSERT_SITE_CODE_SITE":{
            return {...state,siteCode:action.value}
        }
        case "INSERT_GEO_SITE":{
            return {...state,geo:action.value}
        }
        case "INSERT_GEO_NCR_SITE":{
            return {...state,geoNcr:action.value}
        }
        case "INSERT_KM_NCR_SITE":{
            return {...state,kmNcr:action.value}
        }
        case "INSERT_LATITUD_SITE":{
            return {...state,latitud:action.value}
        }
        case "INSERT_LONGITUD_SITE":{
            return {...state,longitud:action.value}
        }
        case "INSERT_OFFSET_SITE":{
            return {...state,offset:action.value}
        }
        case "INSERT_TYPE_DIRECCION_SITE":{
            return {...state,idTipoDireccion:action.value}
        }
        case "INSERT_PAIS_SITE":{
            return {...state,
                pais:action.value,
                estado:null,
                ciudad:null,
                geo:null,
                sourceEstado:[],
                sourceCiudad:[],
                sourceCodigoPostal:[]}
        }
        case "INSERT_ESTADO_SITE":{
            return {...state,estado:action.value,ciudad:null,geo:null,sourceCiudad:[],sourceCodigoPostal:[]}
        }
        case "INSERT_CIUDAD_SITE":{
            return {...state,ciudad:action.value,geo:null,sourceCodigoPostal:[]}
        }
        case "INSERT_MJS_ERR_SITE":{
            return {...state,msjErr:action.value}
        }
        case "INSERT_SOURCE_ESTADO_SITE":{
            return {...state,sourceEstado:action.value}
        }
        case "INSERT_SOURCE_CIUDAD_SITE":{
            return {...state,sourceCiudad:action.value}
        }
        case "INSERT_SOURCE_CODIGO_POSTAL_SITE":{
            return {...state,sourceCodigoPostal:action.value}
        }
        case "INSERT_PRE_LOAD_SITE":{
            return {...state,...action.value}
        }
        case "CLEAR_FORM_SITE":{
            return {...state,...init}
        }

        default:
            return state;
    }
}

export default reducer;