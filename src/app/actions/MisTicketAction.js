import Request from '../Request/Request';
import { changeRequestApp } from './appAction';
import config from '../config';


export function getInicidente() {
    return[
        changeRequestApp(true),
        requestIncidente()
    ]
}

function mjsErr(valor) {
    return {type:"MJSERR_MISINCIDENTES",value:valor}
}

function requestIncidente() {
    return (dispatch)=>{
        Request.get(`${config.path}/Incidente/Usuario`)
            .then(result => {
                dispatch([
                    {type:"LOAD_TABLA_MISINCIDENTES",value:result.data},
                    changeRequestApp(false),
                    mjsErr("")
                ])
            })
            .catch(err =>{
                dispatch([
                    changeRequestApp(false),
                    mjsErr(err.response ? err.response.data.err : "no hay conexion")
                ])
            })
    }
}