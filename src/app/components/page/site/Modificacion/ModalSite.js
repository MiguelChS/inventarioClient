import React from 'react';
import {connect} from 'react-redux';
import {IboxModal} from '../../componentFormulario';
import Formulario from '../Component/FormularioSite';

export default connect()((props) => {
    return (
        <IboxModal Title="Editar Site">
            <Formulario
                idModal={props.idModal}
                data={props.data}
                onLoadFormulario={(form, idModal) => {
                    if (props.data.hasOwnProperty("idTicket")) {
                        form["idTicket"] = props.data.idTicket;
                    }
                    props.dispatch(props.data.onLoadFormulario(form, idModal));
                }}
                btnAcepted={props.data.btnAcepted}
            />
        </IboxModal>
    )
})