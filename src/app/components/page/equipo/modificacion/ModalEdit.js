/**
 * Created by mc185249 on 6/6/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Formulario from '../Component/FormularioV2';
import {IboxModal} from '../../componentFormulario';
import {ActulizarEquipo} from '../../../../actions/formularioEquipoAction'


export default connect()((props) => {
    return(
        <IboxModal Title="Editar Equipo">
            <Formulario
                btnAceptarLabel="Modificar"
                onLoadFormulario={(form) => {
                    props.dispatch(ActulizarEquipo(form))
                }}
                idModal={props.idModal}
                data={props.data}
            />
        </IboxModal>
    )
})