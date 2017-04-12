/**
 * Created by mc185249 on 1/11/2017.
 */
import moment from 'moment';

let inicializar ={
    formulario:{
        sendForm:false,
        idform:null,
        marca:null,
        nroSerie:null,
        modelo:null,
        modulos:null,
        carga:null,
        equipoNcr:null,
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
    tabla:[],
    ProcessSend:false
};

 function reducer(state=inicializar,action){
    switch (action.type){
        case "ALTA_SERIE_EQUIPO":{
            return {...state,formulario:{...state.formulario,nroSerie:action.value}}
        }
        case "SEND_FORM":{
            return {...state,ProcessSend:action.value}
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

        case "INGRESO_EQUIPO_NCR_EQUIPO":{
            return {...state,formulario:{...state.formulario,equipoNcr:action.value}}
        }

        case "INGRESAR_MODULOS":{
            return {...state,formulario:{...state.formulario,modulos:action.value}}
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
                        idform:form.idform,
                        sendForm:form.sendForm,
                        err:null
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
            return {...state,formulario:{...action.value}};
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
            return {...state,tabla:[...tabla]}
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
                    idform:form.idform,
                    sendForm:form.sendForm,
                    err:null
                });
            }
            return {...state,tabla:[...tabla]};
        }

        case "LOAD_STATE_SEND_FORM":{
            let tabla = [...state.tabla];
            tabla = tabla.map(obj=>{
                //cargar en tabla
                let resultSend = action.value.find(res => res.idForm == obj.idform);
                if(resultSend){
                    obj.sendForm = resultSend.send;
                    if(resultSend.send){
                        //cargar en form json
                        let jsonForm = JSON.parse(localStorage.getItem(obj.idform));
                        jsonForm.form.sendForm = true;
                        localStorage.setItem(obj.idform,JSON.stringify(jsonForm));
                    }else{
                        obj.err = resultSend.Error;
                    }
                }
                return obj;
            });
            return {...state,tabla:[...tabla],ProcessSend:false}
        }

        default:
            return state;
    }
}

export default reducer;