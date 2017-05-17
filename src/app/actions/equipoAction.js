/**
 * Created by mc185249 on 1/17/2017.
 */
import Request from '../Request/Request';
import {changeDefaultModule, loadModule} from  './sourceAction';
import { changeRequestApp } from './appAction';


export function altaNroSerie(valor) {
    return {
        type:"ALTA_SERIE_EQUIPO",
        value: valor
    }
}

export function FinishEA(data) {
    return function (dispatch) {
        Request.post('',data)
            .then((result)=>{
                console.log(result);
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
    return [
        {
            type:"INGRESAR_MARCA_EQUIPO",
            value: valor
        },
        cargarPlanta(null),
        cargarModelo(null)
    ]
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

export function cargarEquipoNcr(valor) {
    return {
        type:"INGRESO_EQUIPO_NCR_EQUIPO",
        value: valor
    }
}

export function cargarFormulario(valor) {
    return [{
        type:"CARGAR_FORMULARIO_EQUIPO",
        value:valor
    },
        changeDefaultModule()
    ]
}

export function preCargarFormulario(value,store) {
    let form = JSON.parse(localStorage.getItem(value));
    //modificamos el estado del source modulos
    let objModulo = {...store.modulos};
    for(let i=0;i < form.modulos.length;i++){
        let obj_mod = form.modulos[i];
        objModulo[form.Equipos.value] = objModulo[form.Equipos.value].map((obj)=> {
            if(obj_mod.value == obj.value){
                obj.selected = 1;
            }
            return obj;
        });
    }
    return [
        loadModule(objModulo),
        {
        type:"PRE_CARGAR_FORMULARIO_EQUIPO",
        value:form
        },
    ]
}

export function cargarEquipo(value) {
    return [
        {
            type:"INGRESAR_EQUIPO",
            value:value
        },
        ingresarModulos(null),
        changeDefaultModule()
    ]
}

export function ingresarModulos(valor) {
    return {
        type:"INGRESAR_MODULOS",
        value: valor
    }
}

export function sendForm(valor) {
    return {
        type:"SEND_FORM",
        value: valor
    }
}

export function assignPosition(value) {
    return {
        type:"ASSIGN_AUTO",
        value:value
    }
}

export function insertInstitucion(value) {
    return {
        type:"INGRESAR_INSTITUCION_EQUIPO",
        value:value
    }
}

export function deleteForm(value) {
    return {
        type:"DELETE_FORM",
        idform:value
    }
}

export function LimpiarEA() {
    return {
        type:"CLEAR_EA"
    }
}

export function LoadTablaEA() {
    return {
        type:"LOAD_TABLE"
    }
}

export function loadStateSendForm(valor) {
    return {
        type:"LOAD_STATE_SEND_FORM",
        value:valor
    }
}

export function desAssign(valor) {
    return {
        type:"DES_ASSIGN",
        value:valor
    }
}

export function envioEquipo() {
    let EA = Object.keys(localStorage).filter( item => /_EA$/.test(item));
    let ArrayEnvio = [];
    EA.map((key)=>{
        //buscar los datos en el Local Storage
        let auxLocalStorage = JSON.parse(localStorage.getItem(key));
        let formAux = auxLocalStorage.form;
        if(!formAux.sendForm){
            let form = {
                "id_tipo_eq": formAux.tipoEquipo.value,
                "id_tipo_equipo":formAux.Equipos.value,
                "f_entrega":formAux.fEntrega,
                "id_estado":formAux.estado.value,
                "id_institucion": 1,
                "f_retiro":formAux.fRetiro,
                "f_inst":formAux.fInstalacion,
                "f_fin_garantia":formAux.finGarantia,
                "f_inicio_garantia":formAux.fEntrega,
                "id_xfs":formAux.xfs ? formAux.xfs.value : null,
                "id_so":formAux.so.value,
                "id_snmp":formAux.snmp.value,
                "id_carga":formAux.carga.value,
                "modulos_separados_por_coma":formAux.modulos.map( obj => `${obj.value}`),
                "id_modelo":formAux.modelo.value,
                "nro_serie":`${formAux.planta.prefijo}-${formAux.nroSerie}`,
                "id_planta":formAux.planta.value,
                "id_user":2,
                "id_equipo_ncr":formAux.equipoNcr,
                "horaPrestacion":formAux.prestacion,
                "id_posicion":formAux.position.value == -1 ? null : formAux.position.value,
                "newPosicion":formAux.position.value == -1 ? formAux.position.dataForm: null
            };
            ArrayEnvio.push(sendFormulario(form,key))
        }
    });

    Promise.all(ArrayEnvio)
        .then((result)=>{
            this.props.dispatch(loadStateSendForm(result));
        })
}

function sendFormulario(form,key){
    return new Promise((resolve, reject)=>{
        //verificamos si es un aposicion nueva o existente
        let aux = {
            send:true,
            idForm:key
        };
        if(form.newPosicion){
            form.newPosicion.HoraPrestacion = form.horaPrestacion;
            sendPosicion(form.newPosicion)
                .then((result)=>{
                    delete form.newPosicion;
                    form.id_posicion = result.idPosicion;
                    sendEquipo(form)
                        .then(()=>{
                            resolve(aux);
                        })
                        .catch((err)=>{
                            aux.send=false;
                            aux["Error"]= err.response ? err.response.data : err.message;
                            resolve(aux);
                        })
                })
                .catch((err)=>{
                    aux.send=false;
                    aux["Error"]= err.response ? err.response.data : err.message;
                    resolve(aux);
                });
        }else{
            delete form.newPosicion;
            sendEquipo(form)
                .then((result)=>{
                    resolve(aux);
                })
                .catch((err)=>{
                    aux.send=false;
                    aux["Error"]= err.response ? err.response.data : err.message;
                    resolve(aux);
                });

        }
    });
}

function sendPosicion(form) {
    new Promise((resolve, reject)=>{
        request.post("http://lnxsrv01:5000/equipo",JSON.stringify(form))
            .then((result)=>{
                resolve(result.data)
            })
            .catch((err)=>{
                deletePosicion()
                    .then(()=>{
                        reject(err);
                    })
                    .catch((err)=>{
                        reject(err)
                    });
            });
    })
}

function deletePosicion(idPosicion) {
    request.delete("http://lnxsrv01:5000/equipo",JSON.stringify(idPosicion))
}

function sendEquipo(form) {
    return request.post("http://lnxsrv01:5000/equipo",JSON.stringify(form))
}