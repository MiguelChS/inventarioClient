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
        case "CAMBIAR_ROW_DBA": {
            return {
                ...state, tabla: state.tabla.map(x => {
                    if (x.id === action.value.id) {
                        x.id_estado = action.value.id_estado;
                        x.Estado = state.stateSoucer.find(x => x.value === action.value.id_estado).label
                    }
                    return x;
                })
            }
        }
        default:{
            return state;
        }
    }

}

export default reducer;