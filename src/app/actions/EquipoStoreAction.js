import Request from '../Request/Request';
import config from '../config';
import {formatEquipo, verificarCargaPrestacion} from '../lib'

import {changeRequestApp} from './appAction';

export function loadTableStore() {
    return {type: "LOAD_TABLA_STORE"}
}

export function asignarAlta(valor) {
    return {
        type: "ASIGNAR_ALTA_FORM_STORE",
        value: valor
    }
}

export function enviarFormularios() {
    return [
        changeRequestApp(true),
        sendFormArray()
    ]
}

function sendFormArray() {
    return function (dispatch) {
        let EA = Object.keys(localStorage).filter(item => /_EA$/.test(item));
        let ArrayEnvio = [];
        EA.map((key) => {
            //buscar los datos en el Local Storage
            let formAux = JSON.parse(localStorage.getItem(key));
            if (!formAux.sendForm) {
                let form = formatEquipo(formAux);
                ArrayEnvio.push(sendFormulario(form, key))
            }
        });

        Promise.all(ArrayEnvio)
            .then((result) => {
                dispatch([
                    changeRequestApp(false),
                    {
                        type: "LOAD_STATE_SEND_FORM_STORE",
                        value: result
                    }
                ]);
            })
    }
}

function sendFormulario(form, key) {
    return new Promise((resolve, reject) => {
        if (!verificarCargaPrestacion(form)) {
            resolve({
                key,
                err: "Verifique las horas de prestacion"
            });
            return;
        }
        Request.post(`${config.path}/Equipo`, form)
            .then(() => {
                resolve(null)
            })
            .catch((err) => {
                resolve({
                    key,
                    err: err.response ? err.response.data.err : "Uhh Hubo un problema"
                });
            })
    });
}