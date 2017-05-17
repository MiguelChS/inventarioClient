/**
 * Created by mc185249 on 3/27/2017.
 */
let init={
    id:null,
    cliente:null,
    ncr:null,
    ip:null,
    siteClient:null,
    config_gavetas:null,
    tabla_status:null,
    script:null,
    command:null,
    community_string:null,
    comunicacion:null,
    slm:null,
    flm:null,
    ubicacion_en_site:null,
    prestacion:null,
    id_Equipo:null,
    //horarios
    hourBranch:null,
    hourOperation:null,
    sla:null,
    access:null,
    hourPeak:null,
    hourPrestacion:[],
    //datos extras
    dato2:null,
    dato3:null,
    //datos de comportamienrto de formulario
    sourceSite:[],
    sourceClient:[],
    sourceEquipo:[],
    institucion:null,
    idPrestaciones:[],
    mjsErr:"",
    stateRequtes:false,
    site:null
};

function reducer(state = init,action) {
    switch (action.type){
        case "INSERT_CLIENT_POS":{
            return {...state,cliente:action.value}
        }
        case "INSERT_SOURCE_SITE_POS":{
            return {...state,sourceSite:action.value}
        }
        case "INSERT_SOURCE_SITE_CLIENT_POS":{
            return {...state,sourceClient:action.value}
        }
        case "INSERT_SOURCE_EQUIPO_POS":{
            return {...state,sourceEquipo:action.value}
        }
        case "INSERT_NCR_POS":{
            return {...state,ncr:action.value}
        }
        case "INSERT_IP_POS":{
            return {...state,ip:action.value}
        }
        case "INSERT_SITE_POS":{
            return {...state,site:action.value}
        }
        case "INSERT_SITE_CLIENT_POS":{
            return {...state,siteClient:action.value}
        }
        case "INSERT_GAVETA_POS":{
            return {...state,config_gavetas:action.value}
        }
        case "INSERT_TABLE_STATUS_POS":{
            return {...state,tabla_status:action.value}
        }
        case "INSERT_SCRIPT_POS":{
            return {...state,script:action.value}
        }
        case "INSERT_COMMAND_POS":{
            return {...state,command:action.value}
        }
        case "INSERT_COMMUNITY_STRING_POS":{
            return {...state,community_string:action.value}
        }
        case "INSERT_COMUNICACION_POS":{
            return {...state,comunicacion:action.value}
        }
        case "INSERT_SLM_POS":{
            return {...state,slm:action.value}
        }
        case "INSERT_FLM_POS":{
            return {...state,flm:action.value}
        }
        case "INSERT_HOURPRESTACION_POS":{
            return {...state,hourPrestacion:action.value}
        }
        case "CLEAR_HOURPRESTACION_POS":{
            return {...state,hourPrestacion:[]}
        }
        case "INSERT_PRESTACION_POS":{
            return {...state,prestacion:action.value}
        }
        case "INSERT_UBICACION_POS":{
            return {...state,ubicacion_en_site:action.value}
        }
        case "INSERT_HOUR_BRANCH_POS":{
            return {...state,hourBranch:action.value}
        }
        case "INSERT_HOUR_OPERATION_POS":{
            return {...state,hourOperation:action.value}
        }
        case "INSERT_HOUR_SLA_POS":{
            return {...state,sla:action.value}
        }
        case "INSERT_HOUR_ACCESS_POS":{
            return {...state,access:action.value}
        }
        case "INSERT_HOUR_PEAK_POS":{
            return {...state,hourPeak:action.value}
        }
        case "INSERT_EQUIPO_POS":{
            return {...state,id_Equipo:action.value}
        }
        case "INSERT_REQUEST_PRESTACION_POS":{
            return {...state,stateRequtes:action.value}
        }
        case "INSERT_ID_PRESTACION_POS":{
            return {...state,idPrestaciones:action.value}
        }
        case "INSERT_INSTITUCION_POS":{
            return {...state,institucion:action.value}
        }
        case "INSERT_mjsErr_POS":{
            return {...state,mjsErr:action.value}
        }
        default:
            return state;
    }
}

export default reducer;