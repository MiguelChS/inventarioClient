/**
 * Created by mc185249 on 1/11/2017.
 */
import moment from 'moment';
import AutoCompleteReducer from './AutoCompleReducer';

let inicializar ={
    formulario:{
        marca:null,
        nroSerie:null,
        modelo:null,
        modulos:null,
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
        planta:null,
        id_posicion:null,
        id_institucion:null
    },
    autoComplete:[
        AutoCompleteReducer({id:"idPlanta"}),
        AutoCompleteReducer({id:"idModelo"})
    ]
    ,
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
    },
    tabla:[]
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
        case "CHANGE_SELECTED_MODULES":{
            let objModulo = {...state.source.modulos};
            let auxModulo = [];
            objModulo[action.value.idTipo] = objModulo[action.value.idTipo].map((obj)=> {
                if (obj.value == action.value.value && action.value.show) {
                    obj.selected = action.value.selected;
                }
                if(obj.selected == 1) auxModulo.push({...obj});
                return obj;
            });
            auxModulo = auxModulo.length ? auxModulo : null;
            return {...state,source:{...state.source,modulos:objModulo},formulario:{...state.formulario,modulos:auxModulo}}
        }

        case "CHANGE_SHOW_MODULES":{
            let objModulo = {...state.source.modulos};
            //mostramos todos
            objModulo[action.value.idTipo] = objModulo[action.value.idTipo].map((obj)=> {
                if(action.value.selected == obj.selected){
                    obj.show = 1;
                }
                return obj;
            });
            //escondemos a los que nesecitamos
            let indices = action.value.indice;
            for(let i = 0; i < indices.length;i++){
                objModulo[action.value.idTipo][indices[i]].show = 0;
            }
            return {...state,source:{...state.source,modulos:objModulo}}
        }

        case "CHANGE_MODULE_DEFAULT_ALL":{
            let objModulo = {...state.source.modulos};
            for(let i in objModulo){
                objModulo[i] = objModulo[i].map((obj)=>{
                    obj.selected = 0;
                    obj.show = 1;
                    return obj;
                })
            }
            return {...state,source:{...state.source,modulos:objModulo}}
        }

        case "CHANGE_MODULE_SELECTED_ALL":{
            let objModulo = {...state.source.modulos};
            let auxModulo = [];
            objModulo[action.value.idTipo] = objModulo[action.value.idTipo].map((obj)=> {
                if(obj.show){
                    obj.selected = action.value.selected;
                }
                if(obj.selected == 1) auxModulo.push({...obj});
                return obj;
            });
            auxModulo = auxModulo.length ? auxModulo : null;
            return {...state,source:{...state.source,modulos:objModulo},formulario:{...state.formulario,modulos:auxModulo}}
        }

        case "VALIDAR_FORMULARIO_EQUIPO":{
            let form = {...state.formulario};
            let tabla = [];
            if(form.marca && form.nroSerie && form.modelo && form.modulos && form.carga && form.garantia && form.snmp && form.so && form.tipoEquipo && form.estado && form.planta){
                tabla.push({
                    numPosTable: (tabla.length + 1),
                    numSerie: form.nroSerie,
                    nameSuc:"",
                    posicion:"",
                    button:Date.now()
                });
                let storeAuto = [AutoCompleteReducer({id:"idPlanta"}),AutoCompleteReducer({id:"idModelo"})];
                return {...state,tabla:[...tabla],formulario:{...inicializar.formulario},autoComplete:storeAuto}
            }else{
                alert("incompleto");
                return state;
            }
        }

        case "NO_SELECT_AUTO":{
            let auxAuto = [...state.autoComplete];
            auxAuto = auxAuto.map((store)=>{
                        if(store.getState().id !== action.value.id) return store;
                        store.dispatch({type:action.type,value:action.value.value});
                        return AutoCompleteReducer(store.getState())
                    });
            return {...state,autoComplete:auxAuto};
        }

        case "RESULT_FILTER_AUTO":{
            let auxAuto = [...state.autoComplete];
            auxAuto = auxAuto.map((store)=>{
                if(store.getState().id !== action.value.id) return store;
                store.dispatch({type:action.type,value:{value:action.value.value,text:action.value.text}});
                return AutoCompleteReducer(store.getState())
            });
            return {...state,autoComplete:auxAuto};
        }

        case "SELECT_AUTO":{
            let auxAuto = [...state.autoComplete];
            auxAuto = auxAuto.map((store)=>{
                if(store.getState().id !== action.value.id) return store;
                store.dispatch({type:action.type,value:{indice:action.value.indice,text:action.value.text}});
                return AutoCompleteReducer(store.getState())
            });
            return {...state,autoComplete:auxAuto};
        }

        default:
            return state;
    }
}

export default reducer;