/**
 * Created by mc185249 on 5/9/2017.
 */
import Request from '../Request/Request';
import config from '../config';

import {pageLogin,PageLayaout} from './ActionRouter';

export function changeRequestApp(valor) {
    return {
        type:"CHANGE_REQUEST_APP",
        value: valor
    }
}
export function changeChildrenApp(valor) {
    return {
        type:"CHANGE_CHILDREN_APP",
        value: valor
    }
}
export function changeParentApp(valor) {
    return {
        type:"CHANGE_PARENT_APP",
        value: valor
    }
}
export function insertDataUser(valor) {
    return {
        type:"INSERT_DATA_USER_APP",
        value: valor
    }
}
export function insertNameUser(valor) {
    return {
        type:"INSERT_NAME_USER_APP",
        value: valor
    }
}
export function insertClientes(valor) {
    return {
        type:"INSERT_CLIENTE_APP",
        value: valor
    }
}

export function VerificarToken() {
    return function(dispatch) {
        let token  = localStorage.getItem("token");
        if(!token) return dispatch(pageLogin());
        Request.get(`${config.path}/VerificarToken/${token}`)
            .then((result)=>{
                if(result.data){
                    dispatch([
                        insertNameUser(result.data.nombre),
                        insertClientes(result.data.cliente),
                        PageLayaout()
                    ])
                }else{
                    dispatch(pageLogin())
                }
            })
            .catch(()=>{
                dispatch(pageLogin())
            })
    }
}

export function closeSession() {
    localStorage.removeItem("token");
    return pageLogin();
}