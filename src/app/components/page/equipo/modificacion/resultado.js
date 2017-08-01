/**
 * Created by mc185249 on 5/23/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import {Tabla, Ibox} from '../../componentFormulario';
import {BuscarEquipoPorID} from '../../../../actions/formularioEquipoAction';
import modalEdit from './ModalEdit';

const mapStateToProps= (state)=>{
    return {
        tabla:state.equipoModi.tabla,
        source:state.source,
        cliente:state.app.cliente
    }
};

let tabla = (props) => {
    let Header = [
        {column: "nro_serie", label: "Serie"},
        {column: "cliente_d1", label: "Cliente"},
        {column: "institucion_nombre", label: "Institucion"},
        {column: "tipo_equipo", label: "Equipo"},
        {column: "pais", label: "Pais"},
        {column: "ciudad", label: "Ciudad"},
        {column: "estado", label: "Estado"},
        {column: "codigo_postal", label: "Codigo Postal"},
        {column: "cliente_id", label: "Posicion"},
        {
            column: "",
            label: "",
            render: (data, row) => {
                if (row.pendiente_aprobacion) return null;
                return [
                    <button key={1} className="btn btn-white btn-xs separarButton"
                            onClick={() => {
                                props.dispatch(BuscarEquipoPorID(row.id, props.source, props.cliente, modalEdit))
                            }}>
                        <i className="fa fa-pencil"/>
                    </button>,
                    <button key={2} className="btn btn-white btn-xs separarButton"
                            onClick={() => {

                            }}>
                        <i className="fa fa-trash"/>
                    </button>,
                ]
            }
        },
    ];

    return (
        <Ibox Title="Resultado">
            <Tabla
                Header={Header}
                source={props.tabla}
            />
        </Ibox>
    )
};

export default connect(mapStateToProps)(tabla)