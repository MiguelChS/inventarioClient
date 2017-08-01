import Request from '../Request/Request';
import {changeRequestApp} from './appAction';
import config from '../config/index';
import {addModal} from './modalActionV2';
import * as lib from '../lib';

export function loadFormulario(valor) {
    return {
        type: "LOAD_FORMULARIO_EQUIPO",
        value: valor
    }
}

export function clearFormulario() {
    return {
        type: "CLEAR_FORMULARIO_EQUIPO"
    }
}

export function BuscarEquipoPorID(idEquipo, source, cliente, component) {
    return [
        changeRequestApp(true),
        RequestBuscarEquipo(idEquipo, source, cliente, component)
    ]
}

export function ActulizarEquipo(form) {
    return [
        changeRequestApp(true),
        requestActulizarEquipo(form)
    ]
}

export function buscarEquipo(data) {
    let param = {
        pais: data.pais ? data.pais.value : null,
        cliente: data.cliente ? data.cliente.value : null,
        equipo: data.equipo ? data.equipo.value : null,
        institucion: data.institucion ? data.institucion.value : null,
        site: data.site ? data.site.value : null,
        serie: data.serie ? data.serie : null,
    };
    return [
        changeRequestApp(true),
        requestEquipo(param)
    ]
}

function requestEquipo(data) {
    return (dispatch) => {
        Request.get(`${config.path}/Equipo/${data.equipo}/${data.cliente}/${data.institucion}/${data.site}/${data.pais}/${data.serie}`)
            .then((result) => {
                dispatch([
                    {type: "LOAD_TABLA_EQUIPO_MOD", value: result.data},
                    {type: "INSERT_ERR_EQUIPO_MOD", value: ""},
                    changeRequestApp(false)
                ]);
            })
            .catch((err) => {
                dispatch([
                    {type: "INSERT_ERR_EQUIPO_MOD", value: err.response ? err.response.data.err : "no hay conexion"},
                    changeRequestApp(false)
                ])
            });
    }
}

function requestActulizarEquipo(form) {
    return (dispatch) => {
        form = lib.formatEquipo(form);
        if (!lib.verificarCargaPrestacion(form)) {
            dispatch([
                insertMjsErr("Verifique las horas de prestacion"),
                changeRequestApp(false)
            ]);
            return;
        }
        Request.put(`${config.path}/Equipo`, form)
            .then(() => {
                dispatch([
                    insertMjsErr(""),
                    insertMjsSuccess("se cargo correctamente"),
                    changeRequestApp(false)
                ]);
            })
            .catch((err) => {
                dispatch([
                    insertMjsErr(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ]);
            })
    }
}

function insertMjsErr(valor) {
    return {
        type: "MJS_ERR_EQUIPO",
        value: valor
    }
}

function insertMjsSuccess(valor) {
    return {
        type: "MJS_SUCCESS_EQUIPO",
        value: valor
    }
}

function getSerie(text) {
    let exite = text.indexOf("-");
    if (exite == -1) {
        return text;
    }
    let split = text.split("-");
    return split[1];
}

function OpenFormularioEquipo(data, source, cliente, idEquipo) {
    //cargando el estado de formulario equipo
    let sourceCliente = cliente.find(x => x.value === data.cliente);
    let formulario = {
        idform: idEquipo,
        planta: data.marca === null ? null : source.planta[data.marca].find(x => x.value === data.planta),
        carga: source.carga.find(x => x.value === data.carga),
        estado: source.estado.find(x => x.value === data.estado),
        modelo: data.marca === null ? null : source.modelo[data.marca].find(x => x.value === data.modelo),
        nroSerie: getSerie(data.serie),
        snmp: source.snmp.find(x => x.value === data.snmp),
        so: source.so.find(x => x.value === data.so),
        xfs: source.xfs.find(x => x.value === data.xfs),
        equipo: source.Equipos.find(x => x.value === data.tipoEquipo),
        tipoEquipo: source.tipoEquipo[data.tipoEquipo] ? source.tipoEquipo[data.tipoEquipo].find(x => x.value === data.tipoEq) : null,
        finGarantia: data.f_garantia,
        fInstalacion: data.f_instalacion,
        fRetiro: data.f_retiro,
        fEntrega: data.f_entrega,
        cliente: sourceCliente,
        id_institucion: sourceCliente ? sourceCliente.institucion.find(x => x.value === data.institucion) : null,
        marca: source.marcas.find(x => x.value === data.marca),
        modulos: !source.modulos[data.tipoEquipo] ? null : data.modulos.map(idModu => {
            return source.modulos[data.tipoEquipo].find(x => x.value === idModu)
        }),
        position: data.position,
        site: data.site,
        prestacion: data.prestacion
    };
    return loadFormulario(formulario)
}

function RequestBuscarEquipo(idEquipo, source, cliente, component) {
    return (dispatch) => {
        Request.get(`${config.path}/EquipoById/${idEquipo}`)
            .then((result) => {
                dispatch([
                    changeRequestApp(false),
                    OpenFormularioEquipo(result.data, source, cliente, idEquipo),
                    addModal({body: component, data: null, size: "xl"})
                ]);
            })
            .catch((err) => {
                console.log(err);
                dispatch([
                    //insertError(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}

export function Delete(id) {
    return [
        changeRequestApp(true),
        RequestDeleteEquipo(id)
    ]
}

function RequestDeleteEquipo(idEquipo) {
    return (dispatch) => {
        Request.customize({
            method: 'DELETE',
            url: `${config.path}/EquipoDelete/${idEquipo}`,
            headers: {
                'Content-Type': "application/json",
                'Authorization': localStorage.getItem("token")
            },
            json: true
        })
            .then((result) => {
                dispatch([
                    insertError(""),
                    changeRequestApp(false)
                ]);
            })
            .catch((err) => {
                dispatch([
                    insertError(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}
