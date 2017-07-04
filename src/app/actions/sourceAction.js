/**
 * Created by mc185249 on 4/5/2017.
 */
import request from '../Request/Request';
import {ingresarModulos} from './equipoAction';
import { changeRequestApp } from './appAction';
import {depurar} from '../lib/index';
import { PageInicio } from '../actions/ActionRouter';
import config from '../config';

export function loadSource(valor) {
    return {
        type:"LOAD_SOURCE",
        value:valor
    }
}

export function searchSource() {
    return[
        changeRequestApp(true),
        requestSource()
    ]
}

function requestSource() {
    return(dispatch)=>{
        request.get(`${config.path}/sourceInventario`)
            .then((result)=>{
                dispatch([
                    loadSource(result.data),
                    changeRequestApp(false),
                    PageInicio()
                ])
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false)
                ])
            });
    }
}

function depurarPrestaciones(oldPrestacion,newPrestacion,source) {
    let resultadoPrestacion = [];
    if(oldPrestacion.length){
        //caso que tenga cargado algo
        //verificamos si los id que tiene las prestacion existen en la prestacionDepurada
        oldPrestacion = oldPrestacion.filter(pre => {
            //bucamos si esxite en la expreacion depurada
            return newPrestacion.find(preD => preD.idVentana == pre.value);
        });
        //eliminamos los idVentanda de prestacionDepurada que existan el prestacion
        newPrestacion = newPrestacion.filter(preD =>{
            return !(oldPrestacion.find(pre => pre.value == preD.idVentana))
        });
        //iteramos y macheamos con la fuente de datos tipoHora
        resultadoPrestacion = newPrestacion.map((obj)=>{
            return source.find(vent => vent.value == obj["idVentana"])
        });
        //concatenamos prestacion con nuevasPretaciones
        resultadoPrestacion = [...oldPrestacion,...resultadoPrestacion];
    }else{
        //caso que no tenga nada cargado
        resultadoPrestacion = newPrestacion.map((obj)=>{
            return source.find(vent => vent.value == obj["idVentana"])
        });
    }
    return resultadoPrestacion;
}

export function changeSelectModule(valor,source,prestacion) {
    let objModulo = {...source.modulos};
    let auxModulo = [];
    objModulo[valor.idTipo] = objModulo[valor.idTipo].map((obj)=> {
        if (obj.value == valor.value && valor.show) {
            obj.selected = valor.selected;
        }
        if(obj.selected == 1) auxModulo.push({...obj});
        return obj;
    });
    //depuramos las prestaciones repetidad
    let prestacionDepurada = depurar(auxModulo,"idVentana");
    let nuevasPrestaciones = depurarPrestaciones(prestacion,prestacionDepurada,source.TypeHora);
    //verificamos si se agregaron modulos
    auxModulo = auxModulo.length ? auxModulo : null;
    return [
        {
            type:"CHANGE_SELECTED_MODULES",
            value: objModulo
        },
        ingresarModulos({modulo:auxModulo,prestaciones:nuevasPrestaciones})
    ]
}

export function changeDefaultModule() {
    return {
        type:"CHANGE_MODULE_DEFAULT_ALL"
    }
}

export function changeSelectModuleAll(valor,source,prestacion) {
    let objModulo = {...source.modulos};
    let auxModulo = [];
    objModulo[valor.idTipo] = objModulo[valor.idTipo].map((obj)=> {
        if(obj.show){
            obj.selected = valor.selected;
        }
        if(obj.selected == 1) auxModulo.push({...obj});
        return obj;
    });
    //depuramos las prestaciones repetidad
    let prestacionDepurada = depurar(auxModulo,"idVentana");
    let nuevasPrestaciones = depurarPrestaciones(prestacion,prestacionDepurada,source.TypeHora);
    auxModulo = auxModulo.length ? auxModulo : null;
    return [
        {
            type:"CHANGE_MODULE_SELECTED_ALL",
            value: objModulo
        },
        ingresarModulos({modulo:auxModulo,prestaciones:nuevasPrestaciones})
    ]
}

export function changeShowModule(valor) {
    return {
        type:"CHANGE_SHOW_MODULES",
        value: valor
    }
}

export function loadModule(valor) {
    return {
        type:"PRE_LOAD_SOURCE_MODULO",
        value:valor
    }
}

export function insertTemporalPosicion(valor) {
    return {
        type:"INSERT_POSITION_TEMPORAL",
        value:valor
    }
}

export function insertTemporalSite(valor) {
    return {
        type:"INSERT_SITE_TEMPORAL",
        value:valor
    }
}

