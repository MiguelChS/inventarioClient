/**
 * Created by mc185249 on 1/11/2017.
 */
function reducer (state={nombre:null},action){
    switch (action.type){
        case "ALTA_NAME_SITE":{
            return {...state,nombre:action.nombre}
        }
        default:
            return state;
    }
}

export default reducer;