/**
 * Created by mc185249 on 1/11/2017.
 */
import moment from 'moment';

let inicializar ={
    formulario:{
        marca:null,
        nroSerie:'',
        modelo:null,
        modulos:[],
        carga:null,
        garantia:null,
        iniGarantia:moment().format("YYYY-MM-DD"),
        finGarantia:moment().format("YYYY-MM-DD"),
        snmp:null,
        so:null,
        xfs:null,
        tipoEquipo:null,
        fInstalacion:moment().format("YYYY-MM-DD"),
        fRetiro:moment().format("YYYY-MM-DD"),
        estado:null,
        fEntrega:moment().format("YYYY-MM-DD"),
        planta:null
    },
    source:{
        carga:[],
        estado:[],
        garantia:[],
        marcas:[],
        planta:[],
        snmp:[],
        so:[],
        xfs:[],
        modelo:[],
        tipoEquipo:[],
        modulos:[],
        complete: false
    }
};


 function reducer(state=inicializar,action){
    switch (action.type){
        case "ALTA_SERIE_EQUIPO":{
            return {...state,formulario:{...state.formulario,nroSerie:action.value}}
        }
        case "CARGAR_SOURCE_EQUIPO":{
            return {...state,source:{...state.source,...action.value,complete:true}}
        }
        case "CARGAR_SOURCE_MODELO_EQUIPO":{
            return {...state,source:{...state.source,modelo:action.value}}
        }
        case "INGRESAR_PLANTA_EQUIPO":{
            return {...state,formulario:{...state.formulario,planta:action.value}}
        }
        case "INGRESAR_SNMP_EQUIPO":{
            return {...state,formulario:{...state.formulario,snmp:action.value}}
        }
        case "INGRESAR_SO_EQUIPO":{
            return {...state,formulario:{...state.formulario,so:action.value}}
        }
        case "INGRESAR_XFS_EQUIPO":{
            return {...state,formulario:{...state.formulario,xfs:action.value}}
        }
        case "INGRESAR_MODELO_EQUIPO":{
            return {...state,formulario:{...state.formulario,modelo:action.value}}
        }
        case "INGRESAR_MARCA_EQUIPO":{
            return {...state,formulario:{...state.formulario,marca:action.value}}
        }
        case "INGRESAR_CARGA_EQUIPO":{
            return {...state,formulario:{...state.formulario,carga:action.value}}
        }
        case "INGRESAR_ESTADO_EQUIPO":{
            return {...state,formulario:{...state.formulario,estado:action.value}}
        }
        case "INGRESAR_FECHA_RETIRO_EQUIPO":{
            return {...state,formulario:{...state.formulario,fRetiro:action.value}}
        }
        case "INGRESAR_GARANTIA_EQUIPO":{
            return {...state,formulario:{...state.formulario,garantia:action.value}}
        }
        case "INGRESAR_FECHA_GARANTIA_EQUIPO":{
            return {...state,formulario:{...state.formulario,iniGarantia:action.value.f1,finGarantia:action.value.f2}}
        }
        case "INGRESAR_FECHA_INSTALACION_EQUIPO":{
            return {...state,formulario:{...state.formulario,fInstalacion:action.value}}
        }
        case "INGRESAR_FECHA_ENTREGA_EQUIPO":{
            return {...state,formulario:{...state.formulario,fEntrega:action.value}}
        }
        case "INGRESAR_TIPO_EQUIPO_EQUIPO":{
            return {...state,formulario:{...state.formulario,tipoEquipo:action.value}}
        }
        default:
            return state;
    }
}

export default reducer;