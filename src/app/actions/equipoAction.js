/**
 * Created by mc185249 on 1/17/2017.
 */
import Request from '../Request/Request';
import {changeDefaultModule, loadModule} from  './sourceAction';
import { changeRequestApp } from './appAction';
import config from '../config';


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


export function cargarFormulario() {
    return [{
        type:"CARGAR_FORMULARIO_EQUIPO",
    },
        changeDefaultModule()
    ]
}


export function preCargarFormulario(form,store) {
    //modificamos el estado del source modulos
    let objModulo = {...store.modulos};
    if(form.modulos){
        for(let i=0;i < form.modulos.length;i++){
            let obj_mod = form.modulos[i];
            objModulo[form.Equipos.value] = objModulo[form.Equipos.value].map((obj)=> {
                if(obj_mod.value == obj.value){
                    obj.selected = 1;
                }
                return obj;
            });
        }
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
        cargarTipoEquipo(null),
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

export function insertCliente(value) {
    return [
        {
            type:"INGRESAR_CLIENTE_EQUIPO",
            value:value
        },
        insertInstitucion(null)
    ]
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


export function clearFormulario() {
    return [
        {
            type:"CLEAR_FORM_EQUIPO"
        },
        changeDefaultModule()
    ]
}

export function desAssign(valor) {
    return {
        type:"DES_ASSIGN",
        value:valor
    }
}

function formatHorarios(horario) {
    let array = [];
    for (let attr in horario){
        array.push({
            idHora:attr,
            hora:horario[attr]
        })
    }
    return array;
}

function mapFormularioPosicion(form,site) {
    if(!form) return null;
    return {
        "clientid":form.nombrePoscion,
        "dato2":form.dato2,
        "dato3":form.dato3,
        "idSite":site,
        "ncrid":form.ncr,
        "idconfiggavetas":form.config_gavetas.value,
        "id_status":form.tabla_status.value,
        "idscript":form.script.value,
        "idcommand":form.command.value,
        "idcommunitystring":form.community_string.value,
        "ip":form.ip,
        "iduser":1,
        "idcomunicacion":form.comunicacion.value,
        "idslm":form.slm.value,
        "idflm":form.flm.value,
        "idubicacionensite":form.ubicacion_en_site.value,
        "idprestacion":form.prestacion.value,
        "hourBranch":formatHorarios(form.hourBranch),
        "hourOperation":formatHorarios(form.hourBranch),
        "sla":formatHorarios(form.hourBranch),
        "access":formatHorarios(form.hourBranch),
        "hourPeak":formatHorarios(form.hourBranch),
        "HoraPrestacion":[]
    };
}

export function envioEquipo() {
    return [
        changeRequestApp(true),
        sendFormArray()
    ]
}

function sendFormArray() {
    return function(dispatch) {
        let EA = Object.keys(localStorage).filter( item => /_EA$/.test(item));
        let ArrayEnvio = [];
        EA.map((key)=>{
            //buscar los datos en el Local Storage
            let formAux = JSON.parse(localStorage.getItem(key));
            if(!formAux.sendForm){
                let form = {
                    "id_tipo_eq": formAux.tipoEquipo.value,
                    "id_tipo_equipo":formAux.Equipos.value,
                    "f_entrega":formAux.fEntrega,
                    "id_estado":formAux.estado.value,
                    "id_institucion": formAux.id_institucion.value,
                    "id_user":1,
                    "f_retiro":formAux.fRetiro,
                    "f_inst":formAux.fInstalacion,
                    "f_fin_garantia":formAux.finGarantia,
                    "f_inicio_garantia":formAux.fEntrega,
                    "id_xfs":formAux.xfs ? formAux.xfs.value : null,
                    "id_SO":formAux.so.value,
                    "id_snmp":formAux.snmp.value,
                    "id_carga":formAux.carga.value,
                    "modulos_separados_por_coma":formAux.modulos.map( obj => `${obj.value}`),
                    "id_modelo":formAux.modelo.value,
                    "nro_serie":`${formAux.planta.prefijo}-${formAux.nroSerie}`,
                    "id_planta":formAux.planta.value,
                    "horaPrestacion":formAux.prestacion.map((pre)=>{ return{idHora:`${pre.value}`,hora:pre.hora} }),
                    "id_posicion":formAux.newPosicion ? null : formAux.newPosicion,
                    "newPosicion":mapFormularioPosicion(formAux.newPosicion,formAux.site.value)
                };
                ArrayEnvio.push(sendFormulario(form,key))
            }
        });

        Promise.all(ArrayEnvio)
            .then((result)=>{
                dispatch([
                    changeRequestApp(false),
                    loadStateSendForm(result)
                ]);
            })
     }
}

function verificarCargaPrestacion(form) {
    let flagComplete = true;
    if(form.id_posicion == 0){
        form.horaPrestacion = [];
        return flagComplete;
    }
    form.horaPrestacion.map( obj => {
        if(!obj.hora){
            flagComplete = false;
        }
    });

    return flagComplete;
}

function verificarAssignacion(form) {
    return !(form.newPosicion && form.newPosicion.idSite == 0);
}

function sendFormulario(form,key){
    return new Promise((resolve, reject)=>{
        if(!verificarCargaPrestacion(form)){
            resolve({
                key,
                err:"Verifique las horas de prestacion"
            });
            return;
        }
        if(!verificarAssignacion(form)){
            resolve({
                key,
                err:"Falta asignar un site a la posicion"
            });
            return;
        }
        Request.customize({
            method: 'POST',
            url: `${config.path}/Equipo`,
            data: form,
            headers: {
                'Content-Type': "application/json",
                'Authorization':localStorage.getItem("token")
            },
            json: true
        })
            .then(()=>{
                    resolve(null)
            })
            .catch((err)=>{
                resolve({
                    key,
                    err:err.response ? err.response.data.err : "Uhh Hubo un problema"
                });
            })
    });
}