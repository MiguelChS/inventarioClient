/**
 * Created by mc185249 on 5/23/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import {Ibox, Tabla} from '../../componentFormulario'
import {BuscarSitebyId, errorFilter, ActulizarSite} from '../../../../actions/FormSiteAction';
import ModalSite from './ModalSite';

let resultado = (props)=>{
    let Header = [
        {column: "id", label: "id"},
        {column: "nombre", label: "Site"},
        {column: "lugar", label: "Tipo Lugar"},
        {column: "direccion", label: "Direccion"},
        {column: "cliente", label: "Cliente"},
        {
            column: "",
            label: "",
            render: (data, row) => {
                if (row.pendiente_aprobacion) return null;
                return [
                    <button key={1} className="btn btn-white btn-xs separarButton"
                            onClick={() => {
                                props.dispatch(BuscarSitebyId(
                                    row.id,
                                    {
                                        body: ModalSite,
                                        data: {
                                            btnAcepted: "Modificar",
                                            onLoadFormulario: ActulizarSite
                                        },
                                        size: "xl"
                                    },
                                    errorFilter
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
};

export default connect((state) => {
    return {
        tabla: state.siteModi.tabla
    }
})(resultado)