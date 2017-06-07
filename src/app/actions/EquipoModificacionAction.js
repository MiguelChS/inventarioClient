/**
 * Created by mc185249 on 6/5/2017.
 */
import Request from '../Request/Request';
import { changeRequestApp } from './appAction';
import config from '../config/index';
import { preCargarFormulario } from './equipoAction';
import { addModal } from './modalAction';

export function insertCliente(valor) {
    let action = [
        {
            type:"INSERT_CLIENTE_EQUIPO_MOD",
            value:valor
        },
        insertInstitucion(null),
        insertSite(null),
        insertSourceSite([])
    ];

    if(!valor || !valor.value){
        return action;
    }

    action.push(changeRequestApp(true));
    action.push(getSite(valor));
    return action;
}
export function insertInstitucion(valor) {
    return {
        type:"INSERT_INSTITUCION_EQUIPO_MOD",
        value:valor
    }
}
export function insertSite(valor) {
    return {
        type:"INSERT_SITE_EQUIPO_MOD",
        value:valor
    }
}
export function insertError(valor) {
    return {
        type:"INSERT_ERR_EQUIPO_MOD",
        value:valor
    }
}
export function insertEquipo(valor) {
    return {
        type:"INSERT_EQUIPO_EQUIPO_MOD",
        value:valor
    }
}
export function cargarTabla(valor) {
    return {
        type:"LOAD_TABLA_EQUIPO_MOD",
        value:valor
    }
}
export function getSite(data) {
    return function(dispatch) {
        Request.get(`${config.path}/site/${data.value}`)
            .then((result)=>{
                dispatch([
                    insertSourceSite(result.data),
                    changeRequestApp(false),
                    insertError("")
                ]);
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false),
                    insertError(err.response ? err.response.data.err : "No hay conexion")
                ])
            });
    }
}
export function insertSourceSite(valor) {
    return {
        type:"INSERT_SOURCE_SITE_EQUIPO_MOD",
        value:valor
    }
}
export function insertPais(valor) {
    return {
        type:"INSERT_PAIS_EQUIPO_MOD",
        value:valor
    }
}
export function insertSerie(valor) {
    return {
        type:"INSERT_SERIE_MOD",
        value:valor
    }
}

export function buscarEquipo(data) {
    let param = {
        pais:data.pais ? data.pais.value: null,
        cliente:data.cliente ? data.cliente.value: null,
        equipo:data.equipo ? data.equipo.value: null,
        institucion:data.institucion ? data.institucion.value: null,
        site:data.site ? data.site.value: null,
        serie:data.serie ? data.serie : null,
    };
    return [
        changeRequestApp(true),
        requestEquipo(param)
    ]
}

function requestEquipo(data) {
    return(dispatch)=>{
        Request.get(`${config.path}/Equipo/${data.equipo}/${data.cliente}/${data.institucion}/${data.site}/${data.pais}/${data.serie}`)
            .then((result)=>{
                dispatch([
                    cargarTabla(result.data),
                    insertError(""),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertError(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}

export function Editar(idEquipo,source,cliente) {
    return [
        changeRequestApp(true),
        requestEquipoById(idEquipo,source,cliente)
    ]
}

function OpenFormularioEquipo(data,source,cliente) {
    //cargando el estado de formulario equipo
    let sourceCliente = cliente.find(x => x.value == data.cliente);
    let formulario = {
        planta: data.marca == null ? null : source.planta[data.marca].find(x => x.value == data.planta),
        carga : source.carga.find(x => x.value == data.carga),
        estado : source.estado.find(x => x.value == data.estado),
        modelo: data.marca == null ? null : source.modelo[data.marca].find(x => x.value == data.modelo),
        nroSerie: data.serie,
        snmp: source.snmp.find(x => x.value == data.snmp),
        so: source.so.find(x => x.value == data.so),
        xfs: source.xfs.find(x => x.value == data.xfs),
        Equipos: source.Equipos.find(x => x.value == data.tipoEquipo),
        tipoEquipo: source.tipoEquipo[data.tipoEquipo] ? source.tipoEquipo[data.tipoEquipo].find(x => x.value == data.tipoEq) : null,
        finGarantia: data.f_garantia,
        fInstalacion: data.f_instalacion,
        fRetiro: data.f_retiro,
        fEntrega: data.f_entrega,
        cliente: sourceCliente,
        id_institucion: sourceCliente ? sourceCliente.institucion.find(x => x.value == data.institucion) : null,
        marca: source.marcas.find(x => x.value == data.marca),
        modulos: !source.modulos[data.tipoEquipo] ? null : data.modulos.map( idModu => {
            return source.modulos[data.tipoEquipo].find(x => x.value == idModu)
        })
    };
    //para el caso que no encontro algun modulo lo limpiamos
    formulario.modulos = formulario.modulos ? formulario.modulos.filter(x => x) : [];
    //vemos tien modulos tiene algo
    formulario.modulos = formulario.modulos.length ? formulario.modulos : null;
    return preCargarFormulario(formulario,source)
}

function requestEquipoById(idEquipo,source,cliente) {
    return (dispatch)=>{
        Request.get(`${config.path}/EquipoById/${idEquipo}`)
            .then((result)=>{
                dispatch([
                    insertError(""),
                    changeRequestApp(false),
                    OpenFormularioEquipo(result.data,source,cliente),
                    addModal({body:5,data:null,size:"xl"})
                ]);
            })
            .catch((err)=>{
                console.log(err);
                dispatch([
                    insertError(err.response ? err.response.data.err : "no hay conexion"),
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
    return (dispatch)=>{
        Request.get(`${config.path}/EquipoDelete/${idEquipo}`)
            .then((result)=>{
                dispatch([
                    insertError(""),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                console.log(err);
                dispatch([
                    insertError(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ])
            });
    }
}