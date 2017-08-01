export function depurar(array, props) {
    var hash = {};
    return array.filter(function(current) {
        if(!current[props]) return false;
        var exists = !hash[current[props]] || false;
        hash[current[props]] = true;
        return exists;
    });
}

export function formatPosicion(form) {
    if(!form) return null;
    return {
        "id_position": form.id,
        "clientid":form.nombrePoscion,
        "dato2":form.dato2,
        "dato3":form.dato3,
        "idSite":form.site.value,
        "id_tipo_site": form.id_tipo_Site.value,
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
        "idprestacion": null,
        "hourBranch": form.hourBranch,
        "hourOperation": form.hourOperation,
        "sla": form.sla,
        "access": form.access,
        "hourPeak": form.hourPeak,
        "HoraPrestacion": form.horaPrestacion
    };
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

export function formatEquipo(form) {
    return {
        "idEquipo": form.idform,
        "id_tipo_eq": form.tipoEquipo ? form.tipoEquipo.value : null,
        "id_tipo_equipo": form.equipo ? form.equipo.value : null,
        "f_entrega":form.fEntrega,
        "id_estado":form.estado ? form.estado.value : null,
        "id_institucion": form.id_institucion ? form.id_institucion.value : 0,
        "id_user":1,
        "f_retiro":form.fRetiro,
        "f_inst":form.fInstalacion,
        "f_fin_garantia":form.finGarantia,
        "f_inicio_garantia":form.fEntrega,
        "id_xfs":form.xfs ? form.xfs.value : null,
        "id_SO": form.so ? form.so.value : null,
        "id_snmp":form.snmp ? form.snmp.value : null,
        "id_carga":form.carga ? form.carga.value : null,
        "modulos_separados_por_coma": form.modulos ? form.modulos.map(obj => `${obj.value}`) : null,
        "id_modelo":form.modelo ? form.modelo.value : null,
        "nro_serie":form.planta ? `${form.planta.prefijo}-${form.nroSerie}` : form.nroSerie,
        "id_planta":form.planta ? form.planta.value : null,
        "horaPrestacion": form.prestacion,
        "id_posicion": form.position.value
    };
}

export function verificarCargaPrestacion(form) {
    if (form.id_posicion === 0) {
        form.horaPrestacion = [];
        return true;
    }
    return VerificarPrestacion(form.horaPrestacion);
}

export function formatSite(form) {
    return {
        "id_site": form.id,
        nombreSite: form.nombreSite,
        nombrePublico: form.SitePublic ? form.SitePublic.value : null,
        idTipoLugar: form.Lugar.value,
        direccion: form.SitePublic ? form.SitePublic.Direccion : form.direccion,
        telefono1: form.telefono1,
        telefono2: form.telefono2,
        telefono3: form.telefono3,
        idGeo: form.SitePublic ? form.SitePublic.Id_geo : form.geo.value,
        idGeoCliente: form.geoClient.value,
        idCliente: form.idClient.value,
        latitud: form.SitePublic ? form.SitePublic.latitud.toString() : form.latitud.toString(),
        longitud: form.SitePublic ? form.SitePublic.longitud.toString() : form.longitud.toString(),
        offSet: form.SitePublic ? parseInt(form.SitePublic.offset, 10) : parseInt(form.offset, 10),
        siteCountryCode: form.siteCountryCode
    }
}

/**
 * @return {boolean}
 */
export function VerificarPrestacion(Horas) {
    let flag = true;
    for (let i = 0; i < Horas.length; i++) {
        let item = Horas[i];
        if (!(item.hasOwnProperty("hora") && item.hora)) {
            flag = false;
            break;
        }
    }
    return flag;
}

export function verificarGrupoHora(Horas) {
    for (let i = 0; i < Horas.length; i++) {
        let item = Horas[i];
        if ((item.hasOwnProperty("hora") && item.hora)) {
            return true;
        }
    }
    return false;
}
