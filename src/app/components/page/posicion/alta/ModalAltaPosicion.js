/**
 * Created by mc185249 on 5/8/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import Formulario from './Formulario.jsx';
import { hiddenModal } from '../../../../actions/modalAction.js'
import { sendFormulario } from '../../../../actions/formPositionAction';


let ModalForm = (props)=>{
    return(
        <div>
            <h4 className="titleModal">Asignar Posicion</h4>
            <div className="hr-line-dashed"/>
            <Formulario
                onEnLoad={(form)=>{
                    props.dispatch(sendFormulario(form));
                }}
                onCancel={()=>{
                    props.dispatch(hiddenModal(props.idModal));
                }}
                desdeEquipo={true}
                Default={props.data.default}
            />
        </div>
    )
};
export default connect()(ModalForm)