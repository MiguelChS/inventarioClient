/**
 * Created by mc185249 on 5/24/2017.
 */
let init = {
    client:null,
    mjsErr: "",
    tabla: []
};

function reducer(state = init,action) {
    switch (action.type){
        case "INSERT_CLIENT_MODI_SITE":{
            return {...state,client:action.value}
        }
        case "INSERT_SITE_MODI_SITE":{
            return {...state,site:action.value}
        }
        case "INSERT_SOURCER_SITE_MODI_SITE":{
            return {...state,site:action.value}
        }
        case "MJS_ERR_MODI_SITE": {
            return {...state, mjsErr: action.value}
        }
        case "TABLA_MODI_SITE": {
            return {...state, tabla: action.value}
        }
        case "UPDATE_ROW_MODI_SITE": {
            return {
                ...state, tabla: state.tabla.map(x => {
                    if (x.id !== action.value.id) return x;

                    return {...x, ...action.value}
                })
            }
        }
        default :{
            return state;
        }
    }
}

export default reducer;