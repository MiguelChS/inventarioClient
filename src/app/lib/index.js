export function depurar(array,props) {
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
        "clientid":form.nombrePoscion,
        "dato2":form.dato2,
        "dato3":form.dato3,
        "idSite":form.site.value,
        "id_tipe_site":form.id_tipo_Site.value,
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
        "id_tipo_eq": form.tipoEquipo ? form.tipoEquipo.value : null,
        "id_tipo_equipo": form.Equipos ? form.Equipos.value : null,
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
        "modulos_separados_por_coma":form.modulos ? form.modulos.map( obj => `${obj.value}`) : null,
        "id_modelo":form.modelo ? form.modelo.value : null,
        "nro_serie":form.planta ? `${form.planta.prefijo}-${form.nroSerie}` : form.nroSerie,
        "id_planta":form.planta ? form.planta.value : null,
        "horaPrestacion":form.prestacion.map((pre)=>{ return{idHora:`${pre.value}`,hora:pre.hora} }),
        "id_posicion": form.position.value
    };
}

export function verificarCargaPrestacion(form) {
    let flagComplete = true;
    if(form.id_posicion == 0){
        form.horaPrestacion = [];
        return flagComplete;
    }
    form.horaPrestacion.map( obj => {
        if(!obj.hora){
            flagComplete = false;
        }
    });

    return flagComplete;
}