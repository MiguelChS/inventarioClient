import React from 'react';
import { connect } from  'react-redux';
import {AutoComplete, Select, Input, InputHorarioV2, BoxFilter} from '../../componentFormulario/index.js'
import * as action from '../../../../actions/PosicionAction';
import {getSite} from '../../../../actions/sourceAction';
import {hiddenModal} from '../../../../actions/modalActionV2';
import {verificarGrupoHora, VerificarPrestacion} from '../../../../lib'

function validar(props) {
    let form = props.store;
    //si es para editar validamos las prestaciones tambien
    if (props.data && props.data.hasOwnProperty("Edit") && props.data.Edit) {
        if (!VerificarPrestacion(form.horaPrestacion)) return false;
    }
    return (form.nombrePoscion && form.ncr && form.ip && form.ubicacion_en_site &&
        form.site && form.site.value &&
        form.config_gavetas && form.config_gavetas.value &&
        form.tabla_status && form.tabla_status.value &&
        form.script && form.script.value &&
        form.command && form.command.value &&
        form.community_string && form.community_string.value &&
        form.comunicacion && form.comunicacion.value &&
        form.slm && form.slm.value &&
        form.flm && form.flm.value &&
        form.id_tipo_Site && form.id_tipo_Site.value &&
        verificarGrupoHora(form.access) &&
        verificarGrupoHora(form.hourPeak) &&
        verificarGrupoHora(form.hourOperation) &&
        verificarGrupoHora(form.hourBranch) &&
        verificarGrupoHora(form.sla)
    );
}

function componentModal(props, component) {
    if (!props.hasOwnProperty("idModal")) return null;
    return component;
}

function llamadaDesdeEquipo(props) {
    return props.data && props.data.hasOwnProperty("desdeEquipo") && props.data.desdeEquipo;
}

function llamadaEdit(props, component) {
    if (props.data && props.data.hasOwnProperty("Edit") && props.data.Edit) {
        return component;
    } else {
        return null;
    }
}

function prestaciones(props) {
    let prestacion = props.store.horaPrestacion.map(x => {
        let aux = props.source.TypeHora.find(z => z.value === x.idHora);
        if (!aux) return null;
        //verificar si existe hora
        if (x.hasOwnProperty("hora") && x.hora) {
            aux = {...aux, ...{hora: x.hora}}
        }
        return {...aux}
    });
    return prestacion.filter(x => x);
}

let formulario = (props) => {
    return (
        <form className="form-horizontal" onSubmit={(event) => {
            event.preventDefault();
        }}>
            <div className="row">
                <div className="col-xs-12 text-center">
                    <p className="mjsErr">{props.store.mjsErr}</p>
                    <p className="mjsSuccess">{props.store.mjsSuccess}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.nombrePoscion}
                        label="Nombre posicion"
                        placeHolder="Nombre posicion"
                        required={true}
                        returnValue={(value) => {
                            props.dispatch({type: "INSERT_NOMBRE_POSICION_POS", value: value})
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.ncr ? props.store.ncr : ""}
                        label="NCR"
                        placeHolder="NCR"
                        required={true}
                        returnValue={(value) => {
                            props.dispatch({type: "INSERT_NCR_POS", value: value})
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.ip ? props.store.ip : ""}
                        label="IP"
                        placeHolder="IP"
                        required={true}
                        returnValue={(value) => {
                            props.dispatch({type: "INSERT_IP_POS", value: value})
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Cliente"
                        dataSource={props.cliente}
                        required={true}
                        store={props.store.cliente}
                        onChange={(value) => {
                            if (value && value.value) {
                                props.dispatch(getSite(value.value))
                            }
                            props.dispatch({type: "INSERT_CLIENTE_POS", value: value})
                        }}
                        disabled={(props.request || llamadaDesdeEquipo(props))}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Site"
                        dataSource={props.source.site}
                        required={true}
                        disabled={(props.request || llamadaDesdeEquipo(props))}
                        store={props.store.site}
                        onChange={(value) => {
                            props.dispatch({type: "INSERT_SITE_POS", value: value})
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Status"
                        store={props.store.tabla_status}
                        dataSource={props.source.tablaStatus}
                        required={true}
                        onChange={(value) => {
                            props.dispatch({type: "INSERT_TABLE_STATUS_POS", value: value})
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Script"
                        store={props.store.script}
                        dataSource={props.source.callingScript}
                        required={true}
                        onChange={(value) => {
                            props.dispatch({type: "INSERT_SCRIPT_POS", value: value});
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Command"
                        col={{label: 2, input: 10}}
                        store={props.store.command}
                        dataSource={props.source.commandScript}
                        required={true}
                        onChange={(value) => {
                            props.dispatch({type: "INSERT_COMMAND_POS", value: value});
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Community"
                        col={{label: 2, input: 10}}
                        dataSource={props.source.community}
                        store={props.store.community_string}
                        required={true}
                        onChange={(value) => {
                            props.dispatch({type: "INSERT_COMMUNITY_STRING_POS", value: value});
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="comunicacion"
                        col={{label: 2, input: 10}}
                        dataSource={props.source.comunicacion}
                        store={props.store.comunicacion}
                        required={true}
                        onChange={(value) => {
                            props.dispatch({type: "INSERT_COMUNICACION_POS", value: value});
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="SLM"
                        store={props.store.slm}
                        dataSource={props.source.slm}
                        required={true}
                        onChange={(value) => {
                            props.dispatch({type: "INSERT_SLM_POS", value: value})
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="FLM"
                        dataSource={props.source.flm}
                        store={props.store.flm}
                        required={true}
                        onChange={(value) => {
                            props.dispatch({type: "INSERT_FLM_POS", value: value})
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Select
                        label="Ubicacion"
                        id="idUbicacion"
                        col={{label: 2, input: 10}}
                        dataSource={props.source.ubicacionSite}
                        default={props.store.ubicacion_en_site}
                        required={true}
                        returnSelect={(value) => {
                            props.dispatch({type: "INSERT_UBICACION_POS", value: value})
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">

                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Gaveta"
                        store={props.store.config_gavetas}
                        dataSource={props.source.gavetas}
                        required={true}
                        onChange={(value) => {
                            props.dispatch({type: "INSERT_GAVETA_POS", value: value})
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Tipo Site"
                        store={props.store.id_tipo_Site}
                        dataSource={props.source.TipoSite}
                        required={true}
                        onChange={(value) => {
                            props.dispatch({type: "INSERT_TYPE_SITE_POS", value: value})
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <InputHorarioV2
                        label="Acceso"
                        id="horaAcceso"
                        Horas={[{
                            value: props.store.access[0].idHora,
                            label: "Acceso",
                            color: "green",
                            hora: props.store.access[0].hora
                        }]}
                        required={true}
                        onEndLoad={(horas) => {
                            props.dispatch({
                                type: "INSERT_HOUR_ACCESS_POS",
                                value: horas.map(hora => {
                                    return {
                                        idHora: hora.value,
                                        hora: hora.hora
                                    }
                                })
                            })
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <InputHorarioV2
                        label="Hour Peak"
                        id="horaPeak"
                        required={true}
                        col={{label: 2, input: 10}}
                        Horas={[
                            {
                                value: props.store.hourPeak[0].idHora,
                                label: "Peak Hour",
                                color: "green",
                                hora: props.store.hourPeak[0].hora
                            }, {
                                value: props.store.hourPeak[1].idHora,
                                label: "OffPeak Hour",
                                color: "blue",
                                hora: props.store.hourPeak[1].hora
                            }
                        ]}
                        hour24={true}
                        onEndLoad={(horas) => {
                            props.dispatch({
                                type: "INSERT_HOUR_PEAK_POS",
                                value: horas.map(hora => {
                                    return {
                                        idHora: hora.value,
                                        hora: hora.hora
                                    }
                                })
                            })
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <InputHorarioV2
                        label="Hour Operation"
                        id="horaOperation"
                        Horas={[{
                            value: props.store.hourOperation[0].idHora,
                            label: "Operation",
                            color: "green",
                            hora: props.store.hourOperation[0].hora
                        }]}
                        required={true}
                        onEndLoad={(horas) => {
                            props.dispatch({
                                type: "INSERT_HOUR_OPERATION_POS",
                                value: horas.map(hora => {
                                    return {
                                        idHora: hora.value,
                                        hora: hora.hora
                                    }
                                })
                            })
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <InputHorarioV2
                        label="Branch Hours"
                        id="horaBranch"
                        required={true}
                        hour24={true}
                        Horas={[
                            {
                                value: props.store.hourBranch[0].idHora,
                                label: "After Hour",
                                color: "blue",
                                hora: props.store.hourBranch[0].hora
                            },
                            {
                                value: props.store.hourBranch[1].idHora,
                                label: "Branch Hour",
                                color: "green",
                                hora: props.store.hourBranch[1].hora
                            }, {
                                value: props.store.hourBranch[2].idHora,
                                label: "Other Hour",
                                color: "red",
                                hora: props.store.hourBranch[2].hora
                            }
                        ]}
                        onEndLoad={(horas) => {
                            props.dispatch({
                                type: "INSERT_HOUR_BRANCH_POS",
                                value: horas.map(hora => {
                                    return {
                                        idHora: hora.value,
                                        hora: hora.hora
                                    }
                                })
                            })
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <InputHorarioV2
                        label="SLA"
                        id="horaOperation"
                        Horas={[{
                            value: props.store.sla[0].idHora,
                            label: "SLA",
                            color: "green",
                            hora: props.store.sla[0].hora
                        }]}
                        required={true}
                        onEndLoad={(horas) => {
                            props.dispatch({
                                type: "INSERT_HOUR_SLA_POS",
                                value: horas.map(hora => {
                                    return {
                                        idHora: hora.value,
                                        hora: hora.hora
                                    }
                                })
                            })
                        }}
                    />
                </div>
            </div>

            {llamadaEdit(props,
                <BoxFilter
                    source={prestaciones(props)}
                    filter={false}
                    render={(data) => {
                        return (
                            <InputHorarioV2
                                id={data.value}
                                Horas={[data]}
                                label={data.label}
                                size="btn-xs"
                                required={true}
                                col={{label: 10, input: 2}}
                                style={{fontWeight: "100", textAlign: "left", paddingTop: "2px"}}
                                onEndLoad={(horas) => {
                                    props.dispatch({
                                        type: "INSERT_HOUR_PRESTACION_POS",
                                        value: props.store.horaPrestacion.map(x => {
                                            if (x.idHora !== horas[0].value) return x;
                                            return {
                                                idHora: horas[0].value,
                                                hora: horas[0].hora
                                            }
                                        })
                                    })
                                }}
                            />
                        )
                    }}
                />
            )}

            <div className="hr-line-dashed"/>
            <div className="row">
                <div className="text-center col-xs-12">
                    <button type="button"
                            className="btn btn-white separarButton"
                            onClick={() => {
                                if (!validar(props)) return;
                                props.onLoadForm(props.store)
                            }}
                            disabled={props.request || !validar(props)}
                    >
                        {props.btnAcepted}
                    </button>
                    {componentModal(props,
                        <button type="button"
                                className="btn btn-white separarButton"
                                onClick={() => {
                                    props.dispatch([
                                        hiddenModal(props.idModal),
                                        action.clearForm()
                                    ])
                                }}
                                disabled={props.request}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </div>
        </form>
    )
};

export default connect((state) => {
    return {
        store: state.formPosition,
        source: state.source,
        cliente: state.app.cliente,
        request: state.app.Request
    }
})(formulario);