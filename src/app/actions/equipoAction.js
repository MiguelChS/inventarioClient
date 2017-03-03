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
        request.get('http://localhost:4000/api/sourceIvenEquipo')
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

export function cargarMarca(valor) {
    return {
        type:"INGRESAR_MARCA_EQUIPO",
        value: valor
    }
}

export function cargarModelo(valor) {
    return {
        type:"INGRESAR_MODELO_EQUIPO",
        value: valor
    }
}

export function cargarSNMP(valor) {
    return {
        type:"INGRESAR_SNMP_EQUIPO",
        value: valor
    }
}
export function cargarSO(valor) {
    return {
        type:"INGRESAR_SO_EQUIPO",
        value: valor
    }
}
export function cargarXFS(valor) {
    return {
        type:"INGRESAR_XFS_EQUIPO",
        value: valor
    }
}
export function cargarCarga(valor) {
    return {
        type:"INGRESAR_CARGA_EQUIPO",
        value: valor
    }
}
export function cargarEstado(valor) {
    return {
        type:"INGRESAR_ESTADO_EQUIPO",
        value: valor
    }
}

export function cargarFRetiro(valor) {
    return {
        type:"INGRESAR_FECHA_RETIRO_EQUIPO",
        value: valor
    }
}


export function cargarGarantia(valor) {
    return {
        type:"INGRESAR_GARANTIA_EQUIPO",
        value: valor
    }
}

export function cargarFechaGarantia(valor) {
    return {
        type:"INGRESAR_FECHA_GARANTIA_EQUIPO",
        value: valor
    }
}


export function cargarFechaInstalacion(valor) {
    return {
        type:"INGRESAR_FECHA_INSTALACION_EQUIPO",
        value: valor
    }
}


export function cargarFechaEntrega(valor) {
    return {
        type:"INGRESAR_FECHA_ENTREGA_EQUIPO",
        value: valor
    }
}

export function cargarTipoEquipo(valor) {
    return {
        type:"INGRESAR_TIPO_EQUIPO_EQUIPO",
        value: valor
    }
}

export function searchSourceModelo(valor) {
    return function(dispatch) {
        request.get(`http://localhost:4000/controllerEquipo/findModelo/${valor}`)
            .then((result)=>{
                dispatch({
                    type:"CARGAR_SOURCE_MODELO_EQUIPO",
                    value: result.data.modelo
                })
            })
            .catch((err)=>{
                console.log(err);
            });
    }
}