/**
 * Created by mc185249 on 7/13/2017.
 */
let init = {
    estado: null,
    comentario:"",
    mjsErr:"",
    mjsSuccess:""
};

export default (state=init,action)=>{
    switch (action.type){
        case "STATE_INCIDENTE":{
            return {...state,estado:action.value}
        }
        case "COMMENT_INCIDENT":{
            return {...state,comentario:action.value}
        }
        case "MJSERR_INCIDENT":{
            return {...state,mjsErr:action.value}
        }
        case "MJSSUCCESS_INCIDENT":{
            return {...state,mjsSuccess:action.value}
        }
        case "CLEAR_INCIDENT":{
            return {...state,...init}
        }
        default:{
            return state;
        }

    }
}