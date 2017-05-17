/**
 * Created by mc185249 on 5/12/2017.
 */
import Request from '../Request/Request';
import { changeRequestApp,insertDataUser } from './appAction';
import { PageLayaout } from './ActionRouter';

export function insertUsuario(valor) {
    return {
        type:"INSERT_USUARIO_LOGIN",
        value: valor
    }
}
export function insertPass(valor) {
    return {
        type:"INSERT_PASS_LOGIN",
        value: valor
    }
}
export function clearForm(valor) {
    return {
        type:"CLEAR_FORM_LOGIN",
        value: valor
    }
}
export function insertMjsErr(valor) {
    return {
        type:"INSERT_MJS_ERR_LOGIN",
        value: valor
    }
}

export function sendFormulario(data) {
    return function(dispatch) {
        Request.post('http://localhost:4000/api/login',{
            user:data.usuario,
            pass:data.pass
            })
            .then((result)=>{
                if(result.data){
                    dispatch([
                        insertDataUser(result.data),
                        changeRequestApp(false),
                        insertMjsErr(""),
                        PageLayaout()
                    ])
                }else{
                    dispatch([
                        changeRequestApp(false),
                        insertMjsErr("Usuario y contraseña incorrecto")
                    ])
                }
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false),
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion")
                ])
            })
    }
}