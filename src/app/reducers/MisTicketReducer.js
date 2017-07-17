let init = {
    tabla:[],
    mjsErr:""
};

export default (state = init,action)=>{
    switch (action.type){
        case "LOAD_TABLA_MIS_TICKET":{
            return {...state,tabla:action.value}
        }
        case "MJSERR_MIS_TICKET":{
            return {...state,mjsErr:action.value}
        }
        default:{
            return state;
        }
    }
}
