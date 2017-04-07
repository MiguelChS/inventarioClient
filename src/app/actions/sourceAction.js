/**
 * Created by mc185249 on 4/5/2017.
 */
import request from '../Request/Request';
import {ingresarModulos} from './equipoAction';


export function searchSource() {
    return function(dispatch) {
        request.get('http://lnxsrv01:3012/api/sourceInventario')
            .then((result)=>{
                dispatch({
                    type:"LOAD_SOURCE",
                    value: result.data
                })
            })
            .catch((err)=>{
                console.log(err);
            });
    }
}

export function changeSelectModule(valor,source) {
    let objModulo = {...source};
    let auxModulo = [];
    objModulo[valor.idTipo] = objModulo[valor.idTipo].map((obj)=> {
        if (obj.value == valor.value && valor.show) {
            obj.selected = valor.selected;
        }
        if(obj.selected == 1) auxModulo.push({...obj});
        return obj;
    });
    auxModulo = auxModulo.length ? auxModulo : null;
    return [
        {
            type:"CHANGE_SELECTED_MODULES",
            value: objModulo
        },
        ingresarModulos(auxModulo)
    ]
}

export function changeDefaultModule() {
    return {
        type:"CHANGE_MODULE_DEFAULT_ALL"
    }
}

export function changeSelectModuleAll(valor,source) {
    let objModulo = {...source};
    let auxModulo = [];
    objModulo[valor.idTipo] = objModulo[valor.idTipo].map((obj)=> {
        if(obj.show){
            obj.selected = valor.selected;
        }
        if(obj.selected == 1) auxModulo.push({...obj});
        return obj;
    });
    auxModulo = auxModulo.length ? auxModulo : null;
    return [
        {
            type:"CHANGE_MODULE_SELECTED_ALL",
            value: objModulo
        },
        ingresarModulos(auxModulo)
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
