/**
 * Created by mc185249 on 5/9/2017.
 */
let init={
    nombreSite:"",//editable para publico y propio
    direccion:"",//editable solo para propio
    geo:null,//editable solo para propio
    geoClient:null,// editable para ambos
    idClient:null,//editable para ambos
    idTipoSite:null,//editable para ambos
    latitud:"",//editable para propios
    longitud:"",//editable para propios
    offset:"",//editable para propios,
    telefono1:"",
    telefono2:"",
    telefono3:"",

    //comportamiento propio del formulario
    pais:null, //autoComplete
    estado:null,//autoComplete
    ciudad:null,//autoComplete
    sourceEstado:[],
    sourceCiudad:[],
    sourceCodigoPostal:[],
    sourceSitePublic:[],
    mjsSuccess:"",
    msjErr:"",
    Lugar:null,
    SitePublic:null

};

function reducer (state=init,action){
    switch (action.type){
        case "INSERT_NAME_SITE_SITE":{
            return {...state,nombreSite:action.value}
        }
        case "INSERT_LUGAR_SITE":{
            return {...state,Lugar:action.value}
        }
        case "INSERT_SITE_PUBLIC_SITE":{
            return {...state,SitePublic:action.value}
        }
        case "INSERT_DIRECCION_SITE":{
            return {...state,direccion:action.value}
        }
        case "INSERT_CLIENT_SITE":{
            return {...state,idClient:action.value}
        }
        case "INSERT_TYPE__SITE":{
            return {...state,idTipoSite:action.value}
        }
        case "INSERT_GEO_SITE":{
            return {...state,geo:action.value}
        }
        case "INSERT_GEO_CLIENT_SITE":{
            return {...state,geoClient:action.value}
        }
        case "INSERT_PHONE1_SITE":{
            return {...state,telefono1:action.value}
        }
        case "INSERT_PHONE2_SITE":{
            return {...state,telefono2:action.value}
        }
        case "INSERT_PHONE3_SITE":{
            return {...state,telefono3:action.value}
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
        case "INSERT_MJS_SUCCESS_SITE":{
            return {...state,mjsSuccess:action.value}
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
        case "INSERT_SOURCE_SITE_PUBLIC_POSTAL_SITE":{
            return {...state,sourceSitePublic:action.value}
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