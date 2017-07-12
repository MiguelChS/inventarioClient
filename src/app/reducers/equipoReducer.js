
let inicializar ={
    formulario:{
        sendForm:false,
        idform:null,
        marca:null,
        nroSerie:null,
        modelo:null,
        modulos:null,
        carga:null,
        finGarantia:null,
        snmp:null,
        so:null,
        xfs:null,
        Equipos:null,
        tipoEquipo:null,
        fInstalacion:null,
        fRetiro:null,
        estado:null,
        fEntrega:null,
        planta:null,
        cliente:null,
        site:{
            label:"SIN DATO",
            value: 0
        },
        position:{
            label:"SIN DATO",
            value: 0
        },
        id_institucion:null,
        prestacion:[]
    },
    tabla:[]
};

 function reducer(state=inicializar,action){
    switch (action.type){
        case "ALTA_SERIE_EQUIPO":{
            return {...state,formulario:{...state.formulario,nroSerie:action.value}}
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

        case "INGRESAR_CLIENTE_EQUIPO":{
            return {...state,formulario:{...state.formulario,cliente:action.value}}
        }

        case "INGRESAR_INSTITUCION_EQUIPO":{
            return {...state,formulario:{...state.formulario,
                    id_institucion:action.value,
                    site:{
                        label:"SIN DATO",
                        value: 0
                    },
                    position:{
                        label:"SIN DATO",
                        value: 0
                    }
                }
            }
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

        case "INGRESAR_MODULOS":{
            let modulo = null;
            let prestacion = [];
            if(action.value){
                modulo = action.value.modulo;
                prestacion = action.value.prestaciones;
            }
            return {...state,formulario:{...state.formulario,modulos:modulo,prestacion:prestacion}}
        }

        case "CARGAR_FORMULARIO_EQUIPO":{
            let form = state.formulario;
            let tabla = [...state.tabla];
            //verificamos si tiene el id
            if(form.idform){
                //actulizamos la data de la tabla
                tabla = tabla.map((obj)=>{
                    if(form.idform != obj.idform) return obj;
                    obj.numSerie = `${form.planta.prefijo}-${form.nroSerie}`;
                    obj.nameSuc = form.site.label;
                    obj.posicion = form.position.label;
                    return obj;
                });
            }else{
                //cremos el iddel formulario
                form.idform = `${Date.now()}_EA`;
                //insertamos el nuevo formulario en la tabla
                tabla.push({
                    numSerie: `${form.planta.prefijo}-${form.nroSerie}`,
                    nameSuc: form.site.label,
                    posicion: form.position.label,
                    idform:form.idform,
                    sendForm:form.sendForm,
                    err:null
                });
            }
            //insertamos la data en el local Storage
            localStorage.setItem(form.idform,JSON.stringify(form));
            return {...state,tabla:[...tabla],formulario:{...inicializar.formulario}}
        }

        case "PRE_CARGAR_FORMULARIO_EQUIPO": {
            return {...state,formulario:{...state.formulario,...action.value}};
        }

        case "ASSIGN_AUTO":{
            let tabla = [...state.tabla];
            let data = action.value;
            let labelPosicon = "";
            //buscamos la data del localStorage
            let form = JSON.parse(localStorage.getItem(data.formid));
            //insertamos en la fila de la tabla los nombre de la sucursal y la posicion
            tabla = tabla.map((obj)=>{
                if(form.idform != obj.idform) return obj;
                obj.nameSuc =  data.site.label;
                obj.posicion = data.position.label;
                return obj;
            });
            //insertamos la posicion y site en el formulario principal y las prestaciones
            form.site = data.site;
            form.position = data.position ? data.position : {label:"SIN DATO",value: 0};
            form.prestacion = data.prestacion.map((obj)=>{
                obj["hora"] = obj["hora"][obj.value];
                return obj;
            });
            //actualizamos el local estorage con todo lo nuevo
            localStorage.setItem(form.idform,JSON.stringify(form));
            return {...state,tabla:[...tabla]}
        }

        case "ASSIGN_AUTO_EDIT":{
            let form = {...state.formulario};
            let data = action.value;
            form.site = data.site;
            form.position = data.position ? data.position : {label:"SIN DATO",value: 0};
            form.prestacion = data.prestacion.map((obj)=>{
                obj["hora"] = obj["hora"][obj.value];
                return obj;
            });
            return {...state,formulario: form}
        }

        case "DES_ASSIGN":{
            let tabla = [...state.tabla];
            let form = JSON.parse(localStorage.getItem(action.value));
            form.site = {label:"SIN DATO",value: 0};
            form.position = {label:"SIN DATO",value: 0};
            localStorage.setItem(action.value,JSON.stringify(form));
            tabla = tabla.map(obj=>{
                if(form.idform == obj.idform){
                    obj.nameSuc = "SIN DATO";
                    obj.posicion = "SIN DATO";
                }
                return obj;
            });
            return {...state,tabla:[...tabla]};
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
                let form = JSON.parse(localStorage.getItem(EA[i]));
                tabla.push({
                    numSerie: `${form.planta.prefijo}-${form.nroSerie}`,
                    nameSuc:  form.site.label,
                    posicion: form.position.label,
                    idform:form.idform,
                    sendForm:form.sendForm,
                    err:null
                });
            }
            return {...state,tabla:[...tabla]};
        }

        case "LOAD_STATE_SEND_FORM":{
            let tabla = [...state.tabla];
            tabla = tabla.filter(obj=>{
                //cargar en tabla
                let resultSend = action.value.find(res => (res && res.key == obj.idform));
                if(resultSend){
                    obj.sendForm = false;
                    obj.err = resultSend.err;
                    return obj;
                }else{
                    localStorage.removeItem(obj.idform);
                }
            });
            return {...state,tabla:[...tabla]}
        }

        case "CLEAR_FORM_EQUIPO":{
            return {...state,...inicializar}
        }

        default:
            return state;
    }
}

export default reducer;