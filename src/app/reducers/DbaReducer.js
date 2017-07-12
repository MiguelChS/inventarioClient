/**
 * Created by mc185249 on 7/12/2017.
 */
var init = {
    tabla:[]
};

function reducer(state = init,action) {
    switch (action.type){
        case"CARGAR_TABLA_DBA":{
            return {...state,tabla:action.value}
        }
        default:{
            return state;
        }
    }

}

export default reducer;