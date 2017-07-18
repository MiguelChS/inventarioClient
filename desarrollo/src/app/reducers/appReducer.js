/**
 * Created by mc185249 on 5/9/2017.
 */
let init = {
    Request:false,
    children:null,
    parent:null,
    nombreUsuario:null,
    cliente:[],
    roles:[],
    camposRequeridos:null
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
            if(data.hasOwnProperty("token")){
                localStorage.setItem("token",data.token);
            }
            return {...state,
                nombreUsuario:data.nombreCompleto,
                cliente:data.clientes,
                roles:data.roles,
                camposRequeridos: data.camposRequeridos
            }
        }
        default:
            return state;
    }
}

export default reducer;