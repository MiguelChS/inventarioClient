import React from 'react';
import {connect} from 'react-redux';
import {Ibox,Tabla} from '../componentFormulario';
import { addModal } from '../../../actions/modalActionV2';
import {BuscarPosicionById, ActulizarPosicionIncidente} from '../../../actions/PosicionAction';
import {BuscarSitebyId, ActuliazarSiteCorreccion} from '../../../actions/FormSiteAction';
import {mjsErr} from '../../../actions/MisTicketAction';
import ModalComentario from './modalComentarios';
import ModalSite from '../site/Modificacion/ModalSite'

export default connect(state =>{
    return {
        resultRow: state.misTicket.tabla,
        TipoAccionIncidente: state.source.TipoAccionIncidente
    }
})((props)=>{
    let Header = [
        {column:"Estado",label:"Estado"},
        {
            column: "",
            label: "Tipo Ticket",
            render: function (data, row) {
                let tipoIncidente = props.TipoAccionIncidente.find(x => x.value === row.data.tipo_action);
                return tipoIncidente ? tipoIncidente.label : "";
            }
        },
        {column:"fecha_creacion",label:"Creado"},
        {column:"fecha_modificacion",label:"Ultima Modificacion"},
        {column:"fecha_cierre",label:"Cierre"},
        {column:"id_estado",
            label:"Correguir",
            render: (data, row) => {
                if (data !== 3) return "";
                return(
                    <button  key={1} className="btn btn-white btn-xs separarButton"
                             style={{marginRight:"10px"}}
                             onClick={()=>{
                                 //verificamo que tipo de correccion es
                                 if (row.data.hasOwnProperty("id_equipo")) {

                                 }
                                 if (row.data.hasOwnProperty("id_posicion")) {
                                     props.dispatch(BuscarPosicionById(
                                         row.data.id_posicion,
                                         mjsErr,
                                         {
                                             Edit: true,
                                             correguir: true,
                                             idTicket: row.id,
                                             btnAcepted: "Modificar",
                                             action: ActulizarPosicionIncidente
                                         })
                                     )
                                 }
                                 if (row.data.hasOwnProperty("id_site")) {
                                     props.dispatch(BuscarSitebyId(
                                         row.data.id_site,
                                         {
                                             body: ModalSite,
                                             data: {
                                                 btnAcepted: "Modificar",
                                                 idTicket: row.id,
                                                 onLoadFormulario: ActuliazarSiteCorreccion
                                             },
                                             size: "xl"
                                         },
                                         mjsErr
                                     ))
                                 }

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