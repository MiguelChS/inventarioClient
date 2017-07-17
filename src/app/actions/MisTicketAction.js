import Request from '../Request/Request';
import { changeRequestApp } from './appAction';
import config from '../config';

export function getMisIncidentes() {
    return[
        changeRequestApp(true),
        requestMisIncidentes()
    ]
}

function requestMisIncidentes() {
    return (dispatch)=>{
        Request.get(`${config.path}/Incidente/Usuario`)
            .then((result)=>{
                dispatch([
                    {type:"LOAD_TABLA_MIS_TICKET",value:result.data},
                    {type:"MJSERR_INCIDENT",value:""},
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    {type:"MJSERR_INCIDENT",value:err.response ? err.response.data.err : "no hay conexion"},
                    changeRequestApp(false)
                ])
            });
    }
}