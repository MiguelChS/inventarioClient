/**
 * Created by mc185249 on 7/17/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {IboxModal,Tabla} from '../componentFormulario';
import { hiddenModal } from '../../../actions/modalActionV2';

const Header = [
    {column:"id_usuario",label:"Autor"},
    {column:"comentario",label:"Comentario"},
];

export default connect()((props)=>{
    return(
        <IboxModal Title="Comentarios">
            <Tabla
                Header={Header}
                source={props.data}
            />
            <div className="row">
                <div className="col-xs-12 text-right">
                    <div className="btn-group separarButton">
                        <button type="button"
                                className="btn btn-white"
                                onClick={()=>{
                                    props.dispatch(hiddenModal(props.idModal))
                                }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </IboxModal>
    )
})