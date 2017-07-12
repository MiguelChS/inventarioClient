/**
 * Created by mc185249 on 7/12/2017.
 */
import Request from '../Request/Request';
import { changeRequestApp } from './appAction';
import config from '../config';

export function getIncientes() {
    return[
        changeRequestApp(true),
        getRequestIniciden()
    ]
}

export function loadaTable(data) {
    return {
        type:"CARGAR_TABLA_DBA",
        value:data
    }
}

function getRequestIniciden() {
    return (dispatch)=>{
        Request.get(`${config.path}/Inicidente`)
            .then((result)=>{
                dispatch([
                    //insertError(""),
                    loadaTable(result.data),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    //insertError(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}