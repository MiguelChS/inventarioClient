let init = {
    tabla:[],
    mjsErr:""
};

export default (state = init,action)=>{
    switch (action.type){
        case "LOAD_TABLA_MISINCIDENTES":{
            return {...state,tabla:action.value}
        }
        case "MJSERR_MISINCIDENTES":{
            return {...state,mjsErr:action.value}
        }
        default:{
            return state;
        }
    }
}