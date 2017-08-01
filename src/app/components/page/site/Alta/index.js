import React from 'react';
import { connect } from 'react-redux';
import Formulario from '../Component/FormularioSite';
import Lugar from '../Component/FormTipoLugar';
import {Ibox} from '../../componentFormulario';
import {InsertarFormSite} from '../../../../actions/FormSiteAction'

let Site = (props) => {
    return(
        <div>
            <Ibox Title="Tipo Site">
                <Lugar/>
            </Ibox>
            <Ibox Title="Site Data">
                <Formulario
                    onLoadFormulario={(form) => {
                        props.dispatch(InsertarFormSite(form))
                    }}
                    btnAcepted="Crear Site"
                />
            </Ibox>
        </div>
    )
};
export default connect()(Site);