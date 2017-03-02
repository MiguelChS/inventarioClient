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
        marga:null,
        garantia:null,
        iniGarantia:moment().format("YYYY-MM-DD"),
        finGarantia:moment().format("YYYY-MM-DD"),
        snmp:null,
        so:null,
        xfs:null,
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
        case "INGRESAR_PLANTA_EQUIPO":{
            return {...state,formulario:{...state.formulario,planta:action.value}}
        }
        default:
            return state;
    }
}

export default reducer;