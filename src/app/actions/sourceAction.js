/**
 * Created by mc185249 on 4/5/2017.
 */
import request from '../Request/Request';
import {ingresarModulos} from './equipoAction';
import { changeRequestApp } from './appAction';
import {depurar} from '../lib/index';

export function loadSource(valor) {
    return {
        type:"LOAD_SOURCE",
        value:valor
    }
}

export function searchSource() {
    return function(dispatch) {
        request.get('http://localhost:4000/api/sourceInventario')
            .then((result)=>{
                dispatch([
                    loadSource(result.data),
                    changeRequestApp(false)
                ])
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false)
                ])
            });
    }
}

export function changeSelectModule(valor,source) {
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
    //buscamos las prestacion con sus ventanas horarias corespondientes
    let prestacionHorarioVenta = prestacionDepurada.map((obj)=>{
        return source.TypeHora.find(vent => vent.value == obj["idVentana"])
    });
    //verificamos si se agregaron modulos
    auxModulo = auxModulo.length ? auxModulo : null;
    return [
        {
            type:"CHANGE_SELECTED_MODULES",
            value: objModulo
        },
        ingresarModulos({modulo:auxModulo,typePrestacion:prestacionHorarioVenta})
    ]
}

export function changeDefaultModule() {
    return {
        type:"CHANGE_MODULE_DEFAULT_ALL"
    }
}

export function changeSelectModuleAll(valor,source) {
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
    //buscamos las prestacion con sus ventanas horarias corespondientes
    let prestacionHorarioVenta = prestacionDepurada.map((obj)=>{
        return source.TypeHora.find(vent => vent.value == obj["idVentana"])
    });
    auxModulo = auxModulo.length ? auxModulo : null;
    return [
        {
            type:"CHANGE_MODULE_SELECTED_ALL",
            value: objModulo
        },
        ingresarModulos({modulo:auxModulo,typePrestacion:prestacionHorarioVenta})
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

