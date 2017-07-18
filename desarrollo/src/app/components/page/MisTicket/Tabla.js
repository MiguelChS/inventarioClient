import React from 'react';
import {connect} from 'react-redux';
import {Ibox,Tabla} from '../componentFormulario';
import { addModal } from '../../../actions/modalActionV2';
import ModalComentario from './modalComentarios';

export default connect(state =>{
    return { resultRow : state.misIncidente.tabla}
})((props)=>{
    let Header = [
        {column:"Estado",label:"Estado"},
        {column:"fecha_creacion",label:"Creado"},
        {column:"fecha_modificacion",label:"Ultima Modificacion"},
        {column:"fecha_cierre",label:"Cierre"},
        {column:"id_estado",
            label:"Correguir",
            render:(data)=>{
                if(data != 3) return "";
                return(
                    <button  key={1} className="btn btn-white btn-xs separarButton"
                             style={{marginRight:"10px"}}
                             onClick={()=>{
                                 alert("vas a editar lo q esta mal")
                             }}>
                        <i className='fa fa-pencil'/>
                    </button>
                    )
            }
        },
        {column:"comentario",
            label:"Comentario",
            render:(data)=>{
                if(!data.length) return "";
                let ultimoComentario = data[data.length - 1].comentario;
                return([(
                    <button  key={1} className="btn btn-white btn-xs separarButton"
                             style={{marginRight:"10px"}}
                             onClick={()=>{
                                 props.dispatch(addModal({
                                     size:null,
                                     data:data,
                                     body:ModalComentario
                                 }))
                             }}>
                        <i className='fa fa-plus'/>
                    </button>),
                    ultimoComentario
                ])
            },
            longText:true
        },
    ];

    return(
        <Ibox Title="Resultado">
            <Tabla
                Header={Header}
                source={props.resultRow}
            />
        </Ibox>
    )
});