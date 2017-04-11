/**
 * Created by mc185249 on 3/7/2017.
 */

export function addAuto(valor) {
    return {
        type:"ADD_AUTO",
        value: valor
    }
}

export function deleteAuto(valor) {
    return {
        type:"REMOVE_AUTO",
        value: valor
    }
}

export function noSelect(valor) {
    return {
        type:"NO_SELECT_AUTO",
        value: valor
    }
}

export function filter(valor) {
    return {
        type:"RESULT_FILTER_AUTO",
        value: valor
    }
}

export function select(valor) {
    return {
        type:"SELECT_AUTO",
        value: valor
    }
}

export function loadAuto(valor) {
    return {
        type:"LOAD_AUTO",
        value: valor
    }
}