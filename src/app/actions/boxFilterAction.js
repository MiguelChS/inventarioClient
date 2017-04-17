/**
 * Created by mc185249 on 4/17/2017.
 */
export function loadResult(valor) {
    return {
        type:"LOAD_RESULT_BOX_FILTER",
        value: valor
    }
}
export function loadHour(valor) {
    return {
        type:"LOAD_HORA_BOX_FILTER",
        value: valor
    }
}
export function checkedPretacion(valor) {
    return {
        type:"CHECKED_BOX_FILTER",
        value: valor
    }
}