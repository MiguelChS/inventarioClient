/**
 * Created by mc185249 on 3/27/2017.
 */
let init={
    id:null,
    cliente:null,
    ncr:null,
    site:null,
    site_cliente:null,
    sla:null,
    acceso:null,
    config_gavetas:null,
    tabla_status:null,
    script:null,
    command:null,
    community_string:null,
    ip:null,
    dato2:null,
    dato3:null,
    comunicacion:null,
    slm:null,
    flm:null,
    prestacion:null,
    ubicacion_en_site:null
};

function reducer(state,action) {
    switch (action.type){
        case "ADD_FORM_POS":{
            return {...state,...action.value}
        }
        case "INSERT_CLIENT_POS":{
            return {...state,cliente:action.value.text}
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
        case "INSERT_CLIENT_POS":{
            return state.map(obj =>{
               if(obj.id != action.value.id) return obj;
               return reducer(obj,action);
            });
        }
        default:
            return state;
    }
}

export default arrayReducer;