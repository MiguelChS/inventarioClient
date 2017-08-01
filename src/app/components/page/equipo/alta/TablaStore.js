import React from 'react';
import {connect} from 'react-redux';
import {Tabla} from '../../componentFormulario';
import {loadFormulario} from '../../../../actions/formularioEquipoAction';
import AsignarPosicion from './asignarPosicion'
import {addModal} from '../../../../actions/modalActionV2';
import {modalConfimacion} from '../../../../actions/appAction';
import {asignarAlta} from '../../../../actions/EquipoStoreAction';

let tablaStore = (props) => {
    let Header = [
        {
            column: "numSerie",
            label: "Serie"
        },
        {
            column: "nameSuc",
            label: "Sucursal",
            render: (data) => {
                return data.label;
            }
        },
        {
            column: "posicion",
            label: "Posicion",
            render: (data) => {
                return data.label;
            }
        },
        {
            column: "",
            label: "Asignado",
            render: (data, row) => {
                let classOK = row.nameSuc.value ? "glyphicon glyphicon-ok text-center" : "glyphicon glyphicon-remove text-center";
                return <span className={classOK}/>
            }
        },
        {
            column: "",
            label: "Error",
            render: (data, row) => {
                if (!row.err) return null;
                return (
                    <button className="btn btn-white btn-xs separarButton"
                            onClick={() => {
                                props.dispatch(modalConfimacion({
                                    mensaje: row.err,
                                    hidenAcepte: true,
                                }))
                            }}>
                        <i className="fa fa-exclamation-triangle"/>
                    </button>
                )
            }
        },
        {
            column: "",
            label: "",
            render: (data, row) => {
                return [
                    <button key={1} className="btn btn-white btn-xs separarButton"
                            onClick={() => {
                                let form = JSON.parse(localStorage.getItem(row.idform));
                                props.dispatch(addModal({
                                    body: AsignarPosicion,
                                    data: {
                                        cliente: form.cliente,
                                        site: form.site,
                                        posicion: form.position,
                                        prestacion: form.prestacion,
                                        idform: form.idform,
                                        onLoad: (data) => {
                                            props.dispatch(asignarAlta(data))
                                        }
                                    },
                                    size: null
                                }))
                            }}>
                        asignar
                    </button>,
                    <button key={2} className="btn btn-white btn-xs separarButton"
                            onClick={() => {
                                let form = JSON.parse(localStorage.getItem(row.idform));
                                props.dispatch(loadFormulario(form))
                            }}>
                        <i className="fa fa-pencil"/>
                    </button>,
                    <button key={3} className="btn btn-white btn-xs separarButton"
                            onClick={() => {
                                props.dispatch({type: "DELETE_ROW_TABLA_STORE", value: row.idform})
                            }}>
                        <i className="fa fa-trash"/>
                    </button>,
                    <button key={4} className="btn btn-white btn-xs separarButton"
                            onClick={() => {
                                props.dispatch({type: "DES_ASIGNAR_ALTA_FORM_STORE", value: row.idform})
                            }}>
                        Desasignar
                    </button>
                ]
            }
        }
    ];
    return (
        <Tabla
            Header={Header}
            source={props.tabla}
        />
    )
};

export default connect((state) => {
    return {
        tabla: state.storeEquipo.tabla
    }
})(tablaStore)