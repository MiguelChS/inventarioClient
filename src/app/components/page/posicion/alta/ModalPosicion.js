/**
 * Created by mc185249 on 5/8/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import Formulario from './Formulario';
import {IboxModal} from '../../componentFormulario'

export default connect()((props) => {
    return (
        <IboxModal Title="Nueva Posicion">
            <Formulario
                idModal={props.idModal}
                data={props.data}
                btnAcepted={props.data.btnAcepted}
                onLoadForm={(form) => {
                    if (props.data.hasOwnProperty("idTicket")) {
                        form = {...form, ...{idTicket: props.data.idTicket}};
                    }
                    props.dispatch(props.data.action(form, props.idModal))
                }}
            />
        </IboxModal>
    )
});