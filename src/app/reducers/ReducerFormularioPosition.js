/**
 * Created by mc185249 on 3/27/2017.
 */
let init={
    id:null,
    cliente:null,
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
    id_Equipo:null,
    pretacion:null,
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
    idPrestaciones:[],
    mjsErr:"",
    stateRequtes:false,
};

function reducer(state,action) {
    switch (action.type){
        case "ADD_FORM_POS":{
            return {...state,...action.value}
        }
        case "INSERT_CLIENT_POS":{
            return {...state,cliente:action.value.text}
        }
        case "INSERT_NCR_POS":{
            return {...state,ncr:action.value.text}
        }
        case "INSERT_IP_POS":{
            return {...state,ip:action.value.text}
        }
        case "INSERT_SITE_POS":{
            return {...state,site:action.value.value}
        }
        case "INSERT_GAVETA_POS":{
            return {...state,config_gavetas:action.value.value}
        }
        case "INSERT_TABLE_STATUS_POS":{
            return {...state,tabla_status:action.value.value}
        }
        case "INSERT_SCRIPT_POS":{
            return {...state,script:action.value.value}
        }
        case "INSERT_COMMAND_POS":{
            return {...state,command:action.value.value}
        }
        case "INSERT_COMMUNITY_STRING_POS":{
            return {...state,community_string:action.value.value}
        }
        case "INSERT_COMUNICACION_POS":{
            return {...state,comunicacion:action.value.value}
        }
        case "INSERT_SLM_POS":{
            return {...state,slm:action.value.value}
        }
        case "INSERT_FLM_POS":{
            return {...state,flm:action.value.value}
        }
        case "INSERT_HOURPRESTACION_POS":{
            return {...state,hourPrestacion:action.value.value}
        }
        case "INSERT_PRESTACION_POS":{
            return {...state,pretacion:action.value.value}
        }
        case "INSERT_UBICACION_POS":{
            return {...state,ubicacion_en_site:action.value.value}
        }
        case "INSERT_HOUR_BRANCH_POS":{
            return {...state,hourBranch:action.value.value}
        }
        case "INSERT_HOUR_OPERATION_POS":{
            return {...state,hourOperation:action.value.value}
        }
        case "INSERT_HOUR_SLA_POS":{
            return {...state,sla:action.value.value}
        }
        case "INSERT_HOUR_ACCESS_POS":{
            return {...state,access:action.value.value}
        }
        case "INSERT_HOUR_PEAK_POS":{
            return {...state,hourPeak:action.value.value}
        }
        case "INSERT_EQUIPO_POS":{
            return {...state,id_Equipo:action.value.value}
        }
        case "INSERT_REQUEST_PRESTACION_POS":{
            return {...state,stateRequtes:action.value.value}
        }
        case "INSERT_ID_PRESTACION_POS":{
            return {...state,idPrestaciones:action.value.value}
        }
        case "INSERT_mjsErr_POS":{
            return {...state,mjsErr:action.value.value}
        }
        default:
            return state;
    }
}

function arrayReducer(state=[],action) {
    switch (action.type){
        case "ADD_FORM_POS":{
            return [...state,reducer(init,action)]
        }
        case "INSERT_FORM_POST":{
            return state.map(obj =>{
               if(obj.id != action.value.value.id) return obj;
               return reducer(obj,action.value);
            });
        }
        case 'REMOVE_FORM_POS':{
            return state.filter( store => store.id !== action.value);
        }
        default:
            return state;
    }
}

export default arrayReducer;