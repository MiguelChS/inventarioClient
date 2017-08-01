import React from 'react';
import Formulario from '../Component/FormularioV2';
import TableEquipo from './TablaStore';
import {connect} from  'react-redux';
import {Ibox} from '../../componentFormulario'
import {clearFormulario} from '../../../../actions/formularioEquipoAction';
import {enviarFormularios} from '../../../../actions/EquipoStoreAction';

let Index = (props) => {
    return (
        <Ibox Title="Alta Equipo">
            <Formulario
                btnAceptarLabel="Agregar"
                onLoadFormulario={(form) => {
                    props.dispatch([
                        {type: "ADD_EQUIPO_STORE", value: form},
                        clearFormulario()
                    ])
                }}
            />
            <div className="hr-line-dashed"/>
            <TableEquipo/>
            <div className="hr-line-dashed"/>
            <button className="btn btn-white"
                    type="button"
                    disabled={props.request || !props.tabla.length}
                    onClick={() => {
                        props.dispatch(enviarFormularios())
                    }}>
                Finalizar Carga
            </button>
        </Ibox>
    )
};

export default connect((state) => {
    return {
        tabla: state.storeEquipo.tabla,
        request: state.app.Request
    }
})(Index);