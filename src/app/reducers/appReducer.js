/**
 * Created by mc185249 on 5/9/2017.
 */
let init = {
    Request:false,
    children:null,
    parent:null,
    nombreUsuario:null,
    instituciones:[]
};

function reducer(state=init,action) {
    switch (action.type){
        case "CHANGE_REQUEST_APP":{
            return {...state,Request:action.value}
        }
        case "CHANGE_CHILDREN_APP":{
            return {...state,children:action.value}
        }
        case "CHANGE_PARENT_APP":{
            return {...state,parent:action.value}
        }
        case "INSERT_DATA_USER_APP":{
            let data = action.value;
            localStorage.setItem("token",data.token);
            return {...state,nombreUsuario:data.nombre,instituciones:data.institucion}
        }
        case "INSERT_NAME_USER_APP":{
            return {...state,nombreUsuario:action.value}
        }
        case "INSERT_INSTITUCION_APP":{
            return {...state,instituciones:action.value}
        }
        default:
            return state;
    }
}

export default reducer;