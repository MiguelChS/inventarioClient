import React from 'react';
import {connect} from 'react-redux';
import {Select, AutoComplete, InputSerie, InputFecha} from '../../componentFormulario'
import DualListBox from '../../../dualListBox/dualListeBoxV2';
import {addModal, hiddenModal} from '../../../../actions/modalActionV2'
import * as action from '../../../../actions/formularioEquipoAction'
import AsginarEquipo from '../alta/asignarPosicion';


function mergeCamposRequeridos(camposRequeridosUsuario, cliente) {
    if (cliente && cliente.camposRequeridos) {
        let merge = [].concat(camposRequeridosUsuario, cliente.camposRequeridos.equipo);
        return merge.unique();
    } else {
        return camposRequeridosUsuario;
    }
}

function completeForm(form, Requeridos) {
    let valido = true;
    for (let i = 0; i < Requeridos.length; i++) {
        if (!valido) break;
        switch (Requeridos[i]) {
            case 'marca': {
                valido = !!form.marca;
                break;
            }
            case 'planta': {
                valido = !!form.planta;
                break;
            }
            case 'modelo': {
                valido = !!form.modelo;
                break;
            }
            case 'serie': {
                valido = !!form.nroSerie;
                break;
            }
            case 'equipo': {
                valido = !!form.equipo;
                break;
            }
            case 'tipo': {
                valido = !!form.tipoEquipo;
                break;
            }
            case 'snmp': {
                valido = !!form.snmp;
                break;
            }
            case 'so': {
                valido = !!form.so;
                break;
            }
            case 'xfs': {
                valido = !!form.xfs;
                break;
            }
            case 'carga': {
                valido = !!form.carga;
                break;
            }
            case 'estado': {
                valido = !!form.estado;
                break;
            }
            case 'entrega': {
                valido = !!form.fEntrega;
                break;
            }
            case 'instalacion': {
                valido = !!form.fInstalacion;
                break;
            }
            case 'garantia': {
                valido = !!form.finGarantia;
                break;
            }
            case 'retiro': {
                valido = !!form.fRetiro;
                break;
            }
            case 'cliente': {
                valido = !!form.cliente;
                break;
            }
            case 'institucion': {
                valido = !!form.id_institucion;
                break;
            }
            case 'modulos': {
                valido = !!form.modulos.length;
                break;
            }
        }
    }
    return valido;
}

function componentModal(props, component) {
    if (!props.hasOwnProperty("idModal")) return null;

    return component;
}

let formulario = (props) => {
    let form = props.store;
    let defaultSelectMarca = form.marca ? form.marca["value"] : null;
    let defaultEquipo = form.equipo ? form.equipo["value"] : null;
    let Institucion = form.cliente && form.cliente.value ? form.cliente.institucion : [];
    let Requeridos = mergeCamposRequeridos(props.camposRequeridos, form.cliente);
    return (
        <form className="form-horizontal">
            <div className="row">
                <div className="col-xs-12 text-center">
                    <p className="mjsErr">{props.store.mjsErr}</p>
                    <p className="mjsSuccess">{props.store.mjsSuccess}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <Select
                        label="Marca"
                        id="idMarca"
                        dataSource={props.Source.marcas}
                        default={form.marca}
                        required={Requeridos.find(x => x === 'marca')}
                        returnSelect={(value) => {
                            props.dispatch({type: "MARCA_EQUIPO", value: value});
                        }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <AutoComplete
                        label="Planta"
                        store={form.planta}
                        dataSource={props.Source.planta[defaultSelectMarca] ? props.Source.planta[defaultSelectMarca] : []}
                        required={Requeridos.find(x => x === 'planta')}
                        onChange={(value) => {
                            props.dispatch({type: "PLANTA_EQUIPO", value: value});
                        }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <AutoComplete
                        label="Modelo"
                        required={Requeridos.find(x => x === 'modelo')}
                        store={form.modelo}
                        dataSource={props.Source.modelo[defaultSelectMarca] ? props.Source.modelo[defaultSelectMarca] : []}
                        onChange={(value) => {
                            props.dispatch({type: "MODELO_EQUIPO", value: value});
                        }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <InputSerie label="Serie"
                                id="idSerial"
                                placeHolder="N° Serie"
                                required={Requeridos.find(x => x === 'serie')}
                                storeValue={form.nroSerie}
                                storeValueNoTipeo={form.planta}
                                changeInput={(value) => {
                                    props.dispatch({type: "NROSERIE_EQUIPO", value: value});
                                }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <Select label="Equipo" id="idEquipo"
                            dataSource={props.Source.Equipos}
                            default={form.equipo}
                            required={Requeridos.find(x => x === 'equipo')}
                            returnSelect={(value) => {
                                props.dispatch({type: "EQUIPO_EQUIPO", value: value});
                            }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <Select label="Tipo" id="idEquipo"
                            dataSource={form.equipo ? props.Source.tipoEquipo[form.equipo.value] : []}
                            default={form.tipoEquipo}
                            required={Requeridos.find(x => x === 'tipo')}
                            returnSelect={(value) => {
                                props.dispatch({type: "TIPOEQUIPO_EQUIPO", value: value});
                            }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <Select label="SNMP" id="idSNMP"
                            dataSource={props.Source.snmp}
                            default={form.snmp}
                            required={Requeridos.find(x => x === 'snmp')}
                            returnSelect={(value) => {
                                props.dispatch({type: "SNMP_EQUIPO", value: value});
                            }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <Select label="SO" id="idSO"
                            dataSource={props.Source.so}
                            default={form.so}
                            required={Requeridos.find(x => x === 'so')}
                            returnSelect={(value) => {
                                props.dispatch({type: "SO_EQUIPO", value: value});
                            }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <Select label="xfs"
                            id="idxfs"
                            dataSource={props.Source.xfs}
                            default={form.xfs}
                            required={Requeridos.find(x => x === 'xfs')}
                            returnSelect={(value) => {
                                props.dispatch({type: "XFS_EQUIPO", value: value});
                            }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <Select label="Carga" id="idCarga"
                            dataSource={props.Source.carga}
                            default={form.carga}
                            required={Requeridos.find(x => x === 'carga')}
                            returnSelect={(value) => {
                                props.dispatch({type: "CARGA_EQUIPO", value: value});
                            }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <Select label="Estado" id="idEstado"
                            dataSource={props.Source.estado}
                            default={form.estado}
                            required={Requeridos.find(x => x === 'estado')}
                            returnSelect={(value) => {
                                props.dispatch({type: "ESTADO_EQUIPO", value: value});
                            }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <InputFecha label="Entrega" id="idEntrega"
                                format="DD-MM-YYYY"
                                store={form.fEntrega}
                                returnDateInput={(value) => {
                                    props.dispatch({type: "FECHA_ENTREGA_EQUIPO", value: value});
                                }}
                                require={Requeridos.find(x => x === 'entrega')}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <InputFecha label="Instalacion" id="idInstalacion"
                                format="DD-MM-YYYY"
                                store={form.fInstalacion}
                                col={{label: 3, input: 9}}
                                returnDateInput={(value) => {
                                    props.dispatch({type: "FECHA_INSTALACION_EQUIPO", value: value});
                                }}
                                require={Requeridos.find(x => x === 'instalacion')}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <InputFecha label="Fin Garantia" id="idGarantia"
                                format="DD-MM-YYYY"
                                store={form.finGarantia}
                                col={{label: 4, input: 8}}
                                returnDateInput={(value) => {
                                    props.dispatch({type: "FECHA_FIN_GARANTIA_EQUIPO", value: value});
                                }}
                                require={Requeridos.find(x => x === 'garantia')}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <InputFecha label="Retiro" id="idRetiro"
                                format="DD-MM-YYYY"
                                store={form.fRetiro}
                                returnDateInput={(value) => {
                                    props.dispatch({type: "FECHA_RETIRO_EQUIPO", value: value});
                                }}
                                require={Requeridos.find(x => x === 'retiro')}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <AutoComplete
                        label="Cliente"
                        required={Requeridos.find(x => x === 'cliente')}
                        col={{label: 3, input: 9}}
                        store={form.cliente}
                        dataSource={props.cliente}
                        onChange={(value) => {
                            props.dispatch({type: "CLIENTE_EQUIPO", value: value});
                        }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <AutoComplete
                        label="Institucion"
                        required={Requeridos.find(x => x === 'institucion')}
                        col={{label: 3, input: 9}}
                        store={form.id_institucion}
                        dataSource={Institucion}
                        onChange={(value) => {
                            props.dispatch({type: "INSTITUCION_EQUIPO", value: value});
                        }}
                    />
                </div>
                {componentModal(props,
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="row">
                            <div className="col-xs-12 col-sm-10 col-sm-offset-2">
                                <button
                                    className="btn btn-white separarButton btn-block"
                                    type="button"
                                    onClick={() => {
                                        props.dispatch(addModal({
                                            body: AsginarEquipo,
                                            size: null,
                                            data: {
                                                cliente: form.cliente,
                                                site: form.site,
                                                posicion: form.position,
                                                prestacion: form.prestacion,
                                                idform: form.idform,
                                                onLoad: (data) => {
                                                    props.dispatch({
                                                        type: "ASIGNAR_EQUIPO",
                                                        value: data
                                                    })
                                                }
                                            }
                                        }))
                                    }}
                                >
                                    Asignar o cambiar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {componentModal(props,
                    <div className="col-xs-12 col-sm-offset-2 col-sm-8">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Sucursal</th>
                                <th>Posicion</th>
                                <th>Asignado</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{form.site.label}</td>
                                <td>{form.position.label}</td>
                                <td>
                                    <span
                                        className={form.site.value ? "glyphicon glyphicon-ok text-center" : "glyphicon glyphicon-remove text-center"}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="col-xs-12 boxConten">
                    <DualListBox
                        dataSource={props.Source.modulos[defaultEquipo] ? props.Source.modulos[defaultEquipo] : []}
                        store={form.modulos}
                        required={Requeridos.find(x => x === 'modulos')}
                        onChange={(value) => {
                            props.dispatch({type: "MODULO_EQUIPO", value: value});
                        }}
                    />
                </div>
                <div className="col-xs-12 text-center">
                    <button className="btn btn-white separarButton"
                            type="button"
                            disabled={!completeForm(form, Requeridos) || props.request}
                            onClick={() => {
                                props.onLoadFormulario(form)
                            }}>
                        {props.btnAceptarLabel}
                    </button>
                    {
                        componentModal(props,
                            <button className="btn btn-white separarButton"
                                    type="button"
                                    disabled={props.request}
                                    onClick={() => {
                                        props.dispatch([
                                            hiddenModal(props.idModal),
                                            action.clearFormulario()
                                        ])
                                    }}>
                                Cancelar
                            </button>
                        )
                    }
                </div>
            </div>
        </form>
    )

};


export default connect((state) => {
    return {
        store: state.formEquipo,
        Source: state.source,
        cliente: state.app.cliente,
        request: state.app.Request,
        camposRequeridos: state.app.camposRequeridos.equipo
    }
})(formulario)