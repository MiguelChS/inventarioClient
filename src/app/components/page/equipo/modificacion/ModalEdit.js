/**
 * Created by mc185249 on 6/6/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import Formulario from '../Component/Formulario.jsx';
import { hiddenModal } from '../../../../actions/modalAction.js'


const ModalEdit = (props)=>{
    return(
    <div>
        <h4 className="titleModal">Modificar equipo</h4>
        <div className="hr-line-dashed"/>
        <Formulario
            onLoadFormulario={(form)=>{
                console.log(form);
            }}
            onCloseModal={()=>{
                props.dispatch(hiddenModal(props.idModal));
            }}
        />
    </div>
    )
};

export default connect()(ModalEdit);