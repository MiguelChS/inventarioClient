/**
 * Created by mc185249 on 1/17/2017.
 */
import request from '../Request/Request';

export function altaNroSerie(valor) {
    return {
        type:"ALTA_SERIE_EQUIPO",
        value: valor
    }
}

export function BuscarSource() {
    return function(dispatch) {
        request.get('http://localhost:4000/controllerEquipo/findSelect')
            .then((result)=>{
                dispatch({
                    type:"CARGAR_SOURCE_EQUIPO",
                    value: result.data
                })
            })
            .catch((err)=>{
                console.log(err);
            });
    }
}

export function cargarPlanta(valor) {
    return {
        type:"INGRESAR_PLANTA_EQUIPO",
        value: valor
    }
}