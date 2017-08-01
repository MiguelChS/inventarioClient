/**
 * Created by mc185249 on 3/27/2017.
 */
let init={
    id:null,
    nombrePoscion:null,
    ncr:null,
    ip:null,
    site:null,
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
    id_tipo_Site : null,
    //horarios
    hourBranch: [
        {
            idHora: 1,
            hora: null
        },
        {
            idHora: 2,
            hora: null,
        },
        {
            idHora: 4,
            hora: null
        }
    ],
    hourOperation: [{
        idHora: 3,
        hora: null
    }],
    sla: [{
        idHora: 7,
        hora: null
    }],
    access: [{
        idHora: 8,
        hora: null
    }],
    hourPeak: [
        {
            idHora: 5,
            hora: null,
        },
        {
            idHora: 6,
            hora: null
        }
    ],
    horaPrestacion: [],
    //datos extras
    dato2:null,
    dato3:null,

    //datos de comportamienrto de formulario
    cliente:null,
    mjsErr:"",
    mjsSuccess:""
};

function reducer(state = init,action) {
    switch (action.type){
        case "INSERT_NOMBRE_POSICION_POS":{
            return {...state,nombrePoscion:action.value}
        }
        case "INSERT_TYPE_SITE_POS":{
            return {...state,id_tipo_Site:action.value}
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
        case "INSERT_HOUR_PRESTACION_POS": {
            return {...state, horaPrestacion: action.value}
        }
        case "INSERT_CLIENTE_POS":{
            return {...state, cliente: action.value, site: null}
        }
        case "INSERT_mjsErr_POS":{
            return {...state,mjsErr:action.value}
        }
        case "INSERT_mjsSuccess_POS":{
            return {...state,mjsSuccess:action.value}
        }
        case "CLEAN_FORM_POS":{
            return {...state,...init}
        }
        case "PRE_LOAD_FORM_POS":{
            return {...state,...action.value}
        }
        default:
            return state;
    }
}

export default reducer;