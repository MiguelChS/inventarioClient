/**
 * Created by mc185249 on 7/17/2017.
 */
import Request from '../Request/Request';
import config from '../config';
import { changeRequestApp } from './appAction';

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
        Request.get('http://localhost:3005/api/Incidente/2')
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