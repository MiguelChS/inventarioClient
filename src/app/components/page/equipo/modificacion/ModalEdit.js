/**
 * Created by mc185249 on 6/6/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import Formulario from '../Component/Formulario.jsx';
import { hiddenModal, addModal } from '../../../../actions/modalAction';
import { Update } from '../../../../actions/EquipoModificacionAction';


const ModalEdit = (props)=>{
    return(
    <div>
        <h4 className="titleModal">Modificar equipo</h4>
        <div className="hr-line-dashed"/>
        <Formulario
            onLoadFormulario={(form)=>{
                props.dispatch(Update(form));
            }}
            onCloseModal={()=>{
                props.dispatch(hiddenModal(props.idModal));
            }}
            onAignar={()=>{
                props.dispatch(addModal({body:1,data:{form:props.store},size:null}))
            }}
        />
    </div>
    )
};

const mapStateToProps = (state)=>{
    return{
        store:state.equipo.formulario,
    }
};

export default connect(mapStateToProps)(ModalEdit);