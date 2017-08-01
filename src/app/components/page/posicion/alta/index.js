import React from 'react';
import {connect} from 'react-redux';
import Formulario from './Formulario';
import {Ibox} from '../../componentFormulario';
import {sendFormulario} from '../../../../actions/PosicionAction'


export default connect()((props) => {
    return (
        <Ibox Title="Nueva Posicion">
            <Formulario
                btnAcepted="Crear Posicion"
                onLoadForm={(form) => {
                    props.dispatch(sendFormulario(form))
                }}
            />
        </Ibox>
    )
})
/*if (props.data && props.data.hasOwnProperty("correguir") && props.data.correguir) {
                                    props.dispatch(action.ActulizarPosicionIncidente({...props.store, ...{idTicket: props.data.idTicket}}, props.idModal))
                                } else {
                                    if ((props.data && props.data.hasOwnProperty("Edit") && props.data.Edit)) {
                                        props.dispatch(action.ActulizarPosicion(props.store, props.idModal))
                                    } else {

                                    }
                                }*/