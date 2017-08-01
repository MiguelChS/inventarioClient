/**
 * Created by mc185249 on 7/18/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import {Ibox, Tabla} from '../../componentFormulario';
import {BuscarPosicionById, mjsErrPosicionEdit, ActulizarPosicion} from '../../../../actions/PosicionAction';

const mapStateToProps = (state)=>{
    return {
        tabla: state.editPos.tabla
    }
};


export default connect(mapStateToProps)((props)=>{
    let Header = [
        {column: "id", label: "id"},
        {column: "Cliente", label: "Cliente"},
        {column: "NamePosicion", label: "Posicion"},
        {column: "NameSite", label: "Site"},
        {column: "TipoSite", label: "Tipo Site"},
        {
            column: "",
            label: "",
            render: (data, row) => {
                if (row.pendiente_aprobacion) return null;
                return [
                    <button key={1} className="btn btn-white btn-xs separarButton"
                            onClick={() => {
                                props.dispatch(BuscarPosicionById(
                                    row.id,
                                    mjsErrPosicionEdit,
                                    {
                                        Edit: true,
                                        btnAcepted: "Modificar",
                                        action: ActulizarPosicion
                                    }
                                ))
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
    return(
        <Ibox Title="Resultado">
            <Tabla
                Header={Header}
                source={props.tabla}
            />
        </Ibox>
    )
})