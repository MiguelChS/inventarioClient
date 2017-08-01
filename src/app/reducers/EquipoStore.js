let init = {
    tabla: []
};

const defaultSitePosicion = {
    label: "SIN DATO",
    value: 0
};

export default (state = init, action) => {
    switch (action.type) {
        case "ADD_EQUIPO_STORE": {
            let form = action.value;
            let tabla = [...state.tabla];
            //verificamos si tiene el id
            if (form.idform) {
                //actulizamos la data de la tabla
                tabla = tabla.map((obj) => {
                    if (form.idform !== obj.idform) return obj;
                    obj.numSerie = `${form.planta.prefijo}-${form.nroSerie}`;
                    obj.nameSuc = form.site;
                    obj.posicion = form.position;
                    return obj;
                });
            } else {
                //cremos el iddel formulario
                form.idform = `${Date.now()}_EA`;
                //insertamos el nuevo formulario en la tabla
                tabla.push({
                    numSerie: `${form.planta.prefijo}-${form.nroSerie}`,
                    nameSuc: form.site,
                    posicion: form.position,
                    idform: form.idform,
                    sendForm: null,
                    err: null
                });
            }
            //insertamos la data en el local Storage
            localStorage.setItem(form.idform, JSON.stringify(form));
            return {...state, tabla: tabla}
        }
        case "LOAD_TABLA_STORE": {
            let EA = Object.keys(localStorage).filter(item => /_EA$/.test(item));
            return {
                ...state, tabla: EA.map((key) => {
                    let form = JSON.parse(localStorage.getItem(key))
                    return {
                        numSerie: `${form.planta.prefijo}-${form.nroSerie}`,
                        nameSuc: form.site,
                        posicion: form.position,
                        idform: form.idform,
                        sendForm: form.sendForm,
                        err: null
                    }
                })
            };
        }
        case "DELETE_ROW_TABLA_STORE": {
            localStorage.removeItem(action.value);
            return {...state, tabla: state.tabla.filter(x => x.idform !== action.value)}
        }
        case "ASIGNAR_ALTA_FORM_STORE": {
            let form = JSON.parse(localStorage.getItem(action.value.idform));
            form.site = action.value.site;
            form.position = action.value.posicion;
            form.prestacion = action.value.prestacion;
            localStorage.setItem(form.idform, JSON.stringify(form));
            return {
                ...state, tabla: state.tabla.map(x => {
                    if (x.idform === form.idform) {
                        x.nameSuc = action.value.site;
                        x.posicion = action.value.posicion;
                    }
                    return x;
                })
            }
        }
        case "DES_ASIGNAR_ALTA_FORM_STORE": {
            let form = JSON.parse(localStorage.getItem(action.value));
            form.site = defaultSitePosicion;
            form.position = defaultSitePosicion;
            localStorage.setItem(form.idform, JSON.stringify(form));
            return {
                ...state, tabla: state.tabla.map(x => {
                    if (x.idform === form.idform) {
                        x.nameSuc = defaultSitePosicion;
                        x.posicion = defaultSitePosicion;
                    }
                    return x;
                })
            }

        }
        case "LOAD_STATE_SEND_FORM_STORE": {
            return {
                ...state, tabla: state.tabla.filter(obj => {
                    //cargar en tabla
                    let resultSend = action.value.find(res => (res && res.key === obj.idform));
                    if (resultSend) {
                        obj.sendForm = false;
                        obj.err = resultSend.err;
                        return obj;
                    } else {
                        localStorage.removeItem(obj.idform);
                    }
                })
            }
        }
        default: {
            return state;
        }
    }
}