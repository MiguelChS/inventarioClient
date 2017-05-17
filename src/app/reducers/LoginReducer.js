/**
 * Created by mc185249 on 5/12/2017.
 */
let init = {
    usuario:"",
    pass:"",
    mjsErr:""
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_USUARIO_LOGIN":{
            return {...state,usuario:action.value}
        }
        case "INSERT_PASS_LOGIN":{
            return {...state,pass:action.value}
        }
        case "CLEAR_FORM_LOGIN":{
            return {...state,...init}
        }
        case "INSERT_MJS_ERR_LOGIN":{
            return {...state,mjsErr:action.value}
        }
        default:{
            return state;
        }
    }
}

export default reducer;