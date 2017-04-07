/**
 * Created by mc185249 on 1/17/2017.
 */
import request from '../Request/Request';
import {loadAuto} from './autoCompleteAction';
import {loadModule} from  './sourceAction';

export function altaNroSerie(valor) {
    return {
        type:"ALTA_SERIE_EQUIPO",
        value: valor
    }
}

export function FinishEA(data) {
    return function (dispatch) {
        request.post('',data)
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

export function validarFormulario(valor) {
    return {
        type:"VALIDAR_FORMULARIO_EQUIPO",
        value:valor
    }
}

export function cargarFormulario(value,store) {
    let form = JSON.parse(localStorage.getItem(value));
    let statePlanta = form.AutoComplete.find(obj => obj.id == "idPlanta");
    let stateModelo = form.AutoComplete.find(obj => obj.id == "idModelo");
    let auxForm = form.form;
    //modificamos el estado del source modulos
    let objModulo = {...store.modulos};
    for(let i=0;i < auxForm.modulos.length;i++){
        let obj_mod = auxForm.modulos[i];
        objModulo[auxForm.Equipos.value] = objModulo[auxForm.Equipos.value].map((obj)=> {
            if(obj_mod.value == obj.value){
                obj.selected = 1;
            }
            return obj;
        });
    }
    return [
        loadModule(objModulo),
        {
        type:"CARGAR_FORMULARIO",
        value:form.form
        },
        loadAuto({id:statePlanta.id,state:statePlanta}),
        loadAuto({id:stateModelo.id,state:stateModelo})
    ]
}

export function cargarEquipo(value) {
    return {
        type:"INGRESAR_EQUIPO",
        value:value
    }
}

export function ingresarModulos(valor) {
    return {
        type:"INGRESAR_MODULOS",
        value: valor
    }
}



export function assignPosition(value) {
    return {
        type:"ASSIGN_AUTO",
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