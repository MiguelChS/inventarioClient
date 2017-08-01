import {depurar} from '../lib';

const defaultSitePosicion = {
    label: "SIN DATO",
    value: 0
};

let init = {
    idform: null,
    marca: null,
    nroSerie: null,
    modelo: null,
    modulos: [],
    carga: null,
    finGarantia: null,
    snmp: null,
    so: null,
    xfs: null,
    equipo: null,
    tipoEquipo: null,
    fInstalacion: null,
    fRetiro: null,
    estado: null,
    fEntrega: null,
    planta: null,
    cliente: null,
    site: defaultSitePosicion,
    position: defaultSitePosicion,
    id_institucion: null,
    prestacion: [],
    mjsErr: "",
    mjsSuccess: ""
};

export default (state = init, action) => {
    switch (action.type) {
        case "MARCA_EQUIPO": {
            return {...state, marca: action.value, planta: null, modelo: null}
        }
        case "NROSERIE_EQUIPO": {
            return {...state, nroSerie: action.value}
        }
        case "MODULO_EQUIPO": {
            let aux = depurar(action.value, "idVentana");
            //primero tenemos que sacar el que no existe
            let newPrestaciion = aux.map((item) => {
                return {
                    idHora: item.idVentana
                }
            });
            let oldPrestacion = state.prestacion.filter(item => {
                return newPrestaciion.find(x => x.idHora === item.idHora)
            });
            newPrestaciion = newPrestaciion.filter(item => {
                return !(oldPrestacion.find(x => x.idHora === item.idHora))
            });

            return {...state, modulos: action.value, prestacion: [...oldPrestacion, ...newPrestaciion]}
        }
        case "MODELO_EQUIPO": {
            return {...state, modelo: action.value}
        }
        case "CARGA_EQUIPO": {
            return {...state, carga: action.value}
        }
        case "FECHA_FIN_GARANTIA_EQUIPO": {
            return {...state, finGarantia: action.value}
        }
        case "SNMP_EQUIPO": {
            return {...state, snmp: action.value}
        }
        case "SO_EQUIPO": {
            return {...state, so: action.value}
        }
        case "XFS_EQUIPO": {
            return {...state, xfs: action.value}
        }
        case "EQUIPO_EQUIPO": {
            return {...state, equipo: action.value, tipoEquipo: null, modulos: [], prestacion: []}
        }
        case "TIPOEQUIPO_EQUIPO": {
            return {...state, tipoEquipo: action.value}
        }
        case "FECHA_INSTALACION_EQUIPO": {
            return {...state, fInstalacion: action.value}
        }
        case "FECHA_RETIRO_EQUIPO": {
            return {...state, fRetiro: action.value}
        }
        case "ESTADO_EQUIPO": {
            return {...state, estado: action.value}
        }
        case "FECHA_ENTREGA_EQUIPO": {
            return {...state, fEntrega: action.value}
        }
        case "PLANTA_EQUIPO": {
            return {...state, planta: action.value}
        }
        case "CLIENTE_EQUIPO": {
            return {...state, cliente: action.value, site: defaultSitePosicion, position: defaultSitePosicion}
        }
        case "INSTITUCION_EQUIPO": {
            return {...state, id_institucion: action.value, site: defaultSitePosicion, position: defaultSitePosicion}
        }
        case "LOAD_FORMULARIO_EQUIPO": {
            return {...state, ...action.value}
        }
        case "CLEAR_FORMULARIO_EQUIPO": {
            return {...state, ...init}
        }
        case "MJS_ERR_EQUIPO": {
            return {...state, mjsErr: action.value}
        }
        case "MJS_SUCCESS_EQUIPO": {
            return {...state, mjsSuccess: action.value}
        }
        case "ASIGNAR_EQUIPO": {
            return {
                ...state,
                site: action.value.site,
                position: action.value.posicion,
                prestacion: action.value.prestacion
            }
        }
        default: {
            return state;
        }
    }
}