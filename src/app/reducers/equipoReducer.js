/**
 * Created by mc185249 on 1/11/2017.
 */
import moment from 'moment';

let inicializar ={
    formulario:{
        idform:null,
        marca:null,
        nroSerie:null,
        modelo:null,
        modulos:null,
        carga:null,
        finGarantia:moment().format("YYYY-MM-DD"),
        snmp:null,
        so:null,
        xfs:null,
        Equipos:null,
        tipoEquipo:null,
        fInstalacion:moment().format("YYYY-MM-DD"),
        fRetiro:moment().format("YYYY-MM-DD"),
        estado:null,
        fEntrega:moment().format("YYYY-MM-DD"),
        planta:null,
        position:{
            label:"SIN DATO",
            value: 0
        },
        site:{
            label:"SIN DATO",
            value: 0
        },
        id_institucion:null
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
        Equipos:[],
        tipoEquipo:[],
        modulos:[],
        site:[],
        position:[],
        complete: false
    },
    tabla:[],
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
            return {...state,formulario:{...state.formulario,finGarantia:action.value}}
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

        case "INGRESAR_EQUIPO":{
            return {...state,formulario:{...state.formulario,Equipos:action.value}}
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

        case "INGRESAR_MODULOS":{
            return {...state,formulario:{...state.formulario,modulos:null}}
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
            let tabla = [...state.tabla];
            if(form.marca && form.nroSerie && form.modelo && form.modulos && form.carga && form.snmp && form.so && form.tipoEquipo && form.Equipos && form.estado && form.planta){
                let AutoComp = action.value;
                if(form.idform){
                     tabla = tabla.map((obj)=>{
                         if(form.idform != obj.idform) return obj;
                         obj.numSerie = `${form.planta.prefijo}-${form.nroSerie}`;
                         return obj;
                     });
                     let aux = JSON.parse(localStorage.getItem(form.idform)).AutoComplete;
                     AutoComp = aux.map(obj => {
                         switch (obj.id){
                             case "idPlanta":{
                                 return action.value[0]
                             }
                             case "idModelo":{
                                 return action.value[1]
                             }
                             default:
                                 return obj;
                         }
                     })
                }else{
                    form.idform = `${Date.now()}_EA`;
                    tabla.push({
                        numSerie: `${form.planta.prefijo}-${form.nroSerie}`,
                        nameSuc: form.site.label,
                        posicion: form.position.label,
                        idform:form.idform
                    });
                }
                localStorage.setItem(form.idform,JSON.stringify({form:form,AutoComplete:AutoComp}));
                return {...state,tabla:[...tabla],formulario:{...inicializar.formulario}}
            }else{
                alert("incompleto");
                return state;
            }
        }

        case "CARGAR_FORMULARIO": {
            let form = action.value;
            //modificamos el estado del source modulos
            let objModulo = {...state.source.modulos};
            for(let i=0;i < form.modulos.length;i++){
                let obj_mod = form.modulos[i];
                objModulo[form.Equipos.value] = objModulo[form.Equipos.value].map((obj)=> {
                    if(obj_mod.value == obj.value){
                        obj.selected = 1;
                    }
                    return obj;
                });
            }
            return {...state,formulario:{...form},source:{...state.source,modulos:objModulo}}
        }


        case "ASSIGN_AUTO":{
            let tabla = [...state.tabla];
            let form = JSON.parse(localStorage.getItem(action.value.formid)).form;
            let siteState = action.value.site;
            let positionState = action.value.position;
            tabla = tabla.map((obj)=>{
                if(form.idform != obj.idform) return obj;
                obj.nameSuc =  siteState.resultSelect ? siteState.resultSelect.label : null;
                obj.posicion = positionState.resultSelect ? positionState.resultSelect.label : null;
                return obj;
            });
            let aux = JSON.parse(localStorage.getItem(form.idform)).AutoComplete;
            aux = aux.filter(obj => {
                if(obj.id != "idSite" && obj.id != "idPosicion") return obj;
            });
            aux.push(siteState);
            aux.push(positionState);
            form.position = positionState.resultSelect;
            form.site = siteState.resultSelect;
            localStorage.setItem(form.idform,JSON.stringify({form:form,AutoComplete:[...aux]}));
            let sourcePosicion = {...state.source.position};
            sourcePosicion[siteState.resultSelect.value][positionState.indiceSourceSelect].flag = 0;
            return {...state,tabla:[...tabla],source:{...state.source,position:sourcePosicion}}
        }

        case "DELETE_FORM":{
            let tabla = [...state.tabla];
            tabla = tabla.filter( row => row.idform != action.idform);
            localStorage.removeItem(action.idform);
            return{...state,tabla:[...tabla]};
        }

        case "CLEAR_EA":{
            let EA = Object.keys(localStorage).filter( item => /_EA$/.test(item));
            for(let i = 0 ; i < EA.length; i++){
                localStorage.removeItem(EA[i]);
            }
            return {...state,tabla:[],formulario:{...inicializar.formulario}}
        }

        case "LOAD_TABLE":{
            let tabla = [];
            let EA = Object.keys(localStorage).filter( item => /_EA$/.test(item));
            for(let i = 0 ; i < EA.length; i++){
                let form = JSON.parse(localStorage.getItem(EA[i])).form;
                tabla.push({
                    numSerie: `${form.planta.prefijo}-${form.nroSerie}`,
                    nameSuc: form.site ? form.site.label : null,
                    posicion: form.position ? form.position.label : null,
                    idform:form.idform
                });
            }
            return {...state,tabla:[...tabla]};
        }


        default:
            return state;
    }
}

export default reducer;