let init = {
    posicion: "",
    site: null,
    cliente: null,
    tipoSite: null,
    tabla:[],
    mjsErr:""
};

export default (state = init,action)=>{
    switch (action.type){
        case "POSOCION_POS_EDIT": {
            return {...state, posicion: action.value}
        }
        case "SITE_POS_EDIT": {
            return {...state, site: action.value}
        }
        case "CLIENTE_POS_EDIT": {
            return {...state, cliente: action.value}
        }
        case "TIPO_SITE_POS_EDIT": {
            return {...state, tipoSite: action.value}
        }
        case "LOAD_TABLA_POS_EDIT":{
            return {...state,tabla:action.value}
        }
        case "MJSERR_POS_EDIT":{
            return {...state,mjsErr:action.value}
        }
        default:{
            return state;
        }
    }
}