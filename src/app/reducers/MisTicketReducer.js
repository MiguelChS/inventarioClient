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

        case "CAMBIAR_ESTADO_ROW_MISINCIDENTES": {
            return {
                ...state, tabla: state.tabla.map(x => {
                    if (x.id === action.value) {
                        x.Estado = "Pendiente";
                        x.id_estado = 2;
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