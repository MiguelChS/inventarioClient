/**
 * Created by mc185249 on 7/12/2017.
 */
var init = {
    tabla:[],
    mjsErr:"",
    stateSoucer:[]
};

function reducer(state = init,action) {
    switch (action.type){
        case"CARGAR_TABLA_DBA":{
            return {...state,tabla:action.value}
        }
        case"LOAD_SOURCE_DBA":{
            return {...state,stateSoucer:action.value}
        }
        case "ERR_DBA":{
            return {...state,mjsErr:action.value}
        }
        default:{
            return state;
        }
    }

}

export default reducer;