/**
 * Created by mc185249 on 3/28/2017.
 */
export function addDateGrafic(valor) {
    return {
        type:"ADD_DATEGRAFIC",
        value: valor
    }
}

export function activeBtn(valor) {
    return {
        type:"ACTIVE_BTN_DATE_GRAPHIC",
        value: valor
    }
}

export function changeRadio(valor) {
    return {
        type:"SELECT_RADIO_DATE_GRAPHIC",
        value: valor
    }
}

export function minusBtnDay(valor) {
    return{
        type:"MINUS_BTN_DATE_GRAPHIC",
        value:valor
    }
}

export function paintBody(valor) {
    return{
        type:"PAINT_BODY_DATE_GRAPHIC",
        value:valor
    }
}

export function paintActive(valor) {
    return{
        type:"PAINT_ACTIVE_DATE_GRAPHIC",
        value:valor
    }
}

export function generateHour(valor) {
    return{
        type:"GENERATE_HOUR_DATE_GRAPHIC",
        value:valor
    }
}