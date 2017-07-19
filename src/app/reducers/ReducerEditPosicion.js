let init = {
    tabla:[],
    mjsErr:""
};

export default (state = init,action)=>{
    switch (action.type){
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