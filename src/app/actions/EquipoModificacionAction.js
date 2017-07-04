/**
 * Created by mc185249 on 6/5/2017.
 */
import Request from '../Request/Request';
import { changeRequestApp } from './appAction';
import config from '../config/index';
import { preCargarFormulario } from './equipoAction';
import { addModal } from './modalAction';
import * as lib from '../lib';

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

function mapearPrestacion(data,source) {
    if(!data.modulos) return [];
    let prestacionAux = data.prestacion;
    let modulos = data.modulos;
    modulos = lib.depurar(modulos, "idVentana");
    let resultPrestacion = [];
    modulos.forEach((element) => {
        let prestacion = source.TypeHora.find(x => x.value == element.idVentana);
        let auxPrestacion = {
            value: element.idVentana,
            label: prestacion ? prestacion.label : "Prestacion no Encontrada"
        };
        if(prestacionAux && prestacionAux[element.idVentana]){
            auxPrestacion.hora = prestacionAux[element.idVentana];
        }
        resultPrestacion.push(auxPrestacion)
    });
    return resultPrestacion;
}

function getSerie(text) {
    let exite = text.indexOf("-");
    if(exite == -1){
        return text;
    }
    let split  = text.split("-");
    return split[1];
}

function OpenFormularioEquipo(data,source,cliente,idEquipo) {
    //cargando el estado de formulario equipo
    let sourceCliente = cliente.find(x => x.value == data.cliente);
    let formulario = {
        idform:idEquipo,
        planta: data.marca == null ? null : source.planta[data.marca].find(x => x.value == data.planta),
        carga : source.carga.find(x => x.value == data.carga),
        estado : source.estado.find(x => x.value == data.estado),
        modelo: data.marca == null ? null : source.modelo[data.marca].find(x => x.value == data.modelo),
        nroSerie: getSerie(data.serie),
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
        }),
        position:data.position,
        site:data.site
    };
    //para el caso que no encontro algun modulo lo limpiamos
    formulario.modulos = formulario.modulos ? formulario.modulos.filter(x => x) : [];
    //vemos tien modulos tiene algo
    formulario.modulos = formulario.modulos.length ? formulario.modulos : null;
    //cargamos las prestaciones
    formulario.prestacion =  mapearPrestacion({prestacion:data.prestacion,modulos:formulario.modulos},source);
    return preCargarFormulario(formulario,source)
}

function requestEquipoById(idEquipo,source,cliente) {
    return (dispatch)=>{
        Request.get(`${config.path}/EquipoById/${idEquipo}`)
            .then((result)=>{
                dispatch([
                    insertError(""),
                    changeRequestApp(false),
                    OpenFormularioEquipo(result.data,source,cliente,idEquipo),
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

export function Update(data) {
    return[
        changeRequestApp(true),
        RequestUpdateEquipo(data)
    ]
}

function formatHorarios(horario) {
    let array = [];
    for (let attr in horario){
        array.push({
            idHora:attr,
            hora:horario[attr]
        })
    }
    return array;
}

function mapFormularioPosicion(form,site) {
    if(!form) return null;
    return {
        "clientid":form.nombrePoscion,
        "dato2":form.dato2,
        "dato3":form.dato3,
        "idSite":site,
        "ncrid":form.ncr,
        "idconfiggavetas":form.config_gavetas.value,
        "id_status":form.tabla_status.value,
        "idscript":form.script.value,
        "idcommand":form.command.value,
        "idcommunitystring":form.community_string.value,
        "ip":form.ip,
        "iduser":1,
        "idcomunicacion":form.comunicacion.value,
        "idslm":form.slm.value,
        "idflm":form.flm.value,
        "idubicacionensite":form.ubicacion_en_site.value,
        "idprestacion":form.prestacion.value,
        "hourBranch":formatHorarios(form.hourBranch),
        "hourOperation":formatHorarios(form.hourOperation),
        "sla":formatHorarios(form.sla),
        "access":formatHorarios(form.access),
        "hourPeak":formatHorarios(form.hourPeak),
        "HoraPrestacion":[]
    };
}

function formatEquipo(form) {
    return {
        "idEquipo":form.idform,
        "id_tipo_eq": form.tipoEquipo.value,
        "id_tipo_equipo":form.Equipos.value,
        "f_entrega":form.fEntrega,
        "id_estado":form.estado.value,
        "id_institucion": form.id_institucion.value,
        "id_user":1,
        "f_retiro":form.fRetiro,
        "f_inst":form.fInstalacion,
        "f_fin_garantia":form.finGarantia,
        "f_inicio_garantia":form.fEntrega,
        "id_xfs":form.xfs ? form.xfs.value : null,
        "id_SO":form.so.value,
        "id_snmp":form.snmp.value,
        "id_carga":form.carga.value,
        "modulos_separados_por_coma":form.modulos.map( obj => `${obj.value}`),
        "id_modelo":form.modelo.value,
        "nro_serie":`${form.planta.prefijo}-${form.nroSerie}`,
        "id_planta":form.planta.value,
        "horaPrestacion":form.prestacion.map((pre)=>{ return{idHora:`${pre.value}`,hora:pre.hora} }),
        "id_posicion":form.newPosicion ? null : form.position.value,
        "newPosicion":mapFormularioPosicion(form.newPosicion,form.site.value)
    };
}

function RequestUpdateEquipo(data) {
    return (dispatch)=>{
        let form = formatEquipo(data);
        Request.customize({
            method: 'PUT',
            url: `${config.path}/Equipo`,
            data: form,
            headers: {
                'Content-Type': "application/json",
                'Authorization':localStorage.getItem("token")
            }
        })
            .then(()=>{
                dispatch([
                    insertError(""),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    insertError(err.response ? err.response.data.err : "no hay conexion"),
                    changeRequestApp(false)
                ]);
            })
    }
}

function RequestDeleteEquipo(idEquipo) {
    return (dispatch)=>{
        Request.customize({
            method: 'DELETE',
            url: `${config.path}/EquipoDelete/${idEquipo}`,
            headers: {
                'Content-Type': "application/json",
                'Authorization':localStorage.getItem("token")
            },
            json: true
        })
            .then((result)=>{
                dispatch([
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

