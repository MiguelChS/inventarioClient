/**
 * Created by mc185249 on 7/18/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Ibox,Tabla} from '../../componentFormulario'

const mapStateToProps = (state)=>{
    return {
        tabla: state.editPos.tabla
    }
};


export default connect(mapStateToProps)((props)=>{
    var Header =[
        {}
    ];
    return(
        <Ibox>
            <Tabla
                Header={Header}
                source={props.tabla}
            />
        </Ibox>
    )
})