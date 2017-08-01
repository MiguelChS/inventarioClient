import React from 'react';
import { connect } from 'react-redux';
import {addModal} from '../../../actions/modalActionV2';
import {Ibox, Tabla} from '../componentFormulario';
import ModalComentario from './modalComentarios';
import CambiarEstado from './CambiarEstado';

let tabla = (props)=>{
    let Header = [
        {column:"Estado",label:"Estado"},
        {column:"fecha_creacion",label:"Creado"},
        {
            column: "autor",
            label: "Autor",
            render: function (data) {
                return data.nombre
            }
        },
        {
            column: "",
            label: "Tipo Ticket",
            render: function (data, row) {
                let tipoIncidente = props.TipoAccionIncidente.find(x => x.value === row.data.tipo_action);
                return tipoIncidente ? tipoIncidente.label : "";
            }
        },
        {column:"fecha_modificacion",label:"Ultima Modificacion"},
        {column:"fecha_cierre",label:"Cierre"},
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
        {
            column: "",
            label: "",
            render: function (data, row) {
                if (row.id_estado === 1 || row.id_estado === 2) {
                    return [
                        <button key={1} className="btn btn-white btn-xs separarButton"
                                onClick={() => {
                                    props.dispatch([
                                        addModal({
                                            size: null,
                                            data: row,
                                            body: CambiarEstado
                                        })
                                    ])
                                }}>
                            <i className="fa fa-pencil"/>
                        </button>,
                        <button key={2} className="btn btn-white btn-xs separarButton"
                                onClick={() => {

                                }}>
                            <i className="fa fa-trash"/>
                        </button>
                    ]
                }
                return "";
            }
        },
    ];
    return(
    <Ibox Title="Resultado">
        <Tabla
            Header={Header}
            source={props.tabla}
        />
    </Ibox>
    )
};

let mapStateToProps = (state)=>{
    return {
        tabla: state.dba.tabla,
        source: state.dba.stateSoucer,
        request: state.app.Request,
        TipoAccionIncidente: state.source.TipoAccionIncidente
    }
};

export default connect(mapStateToProps)(tabla);

/*<Row style={{...style,...{marginTop:"10px"}}} bsClass="row wrapperWhite">
 <Col xs={12} bsClass="litleHeader col">
 <h5>Result</h5>
 </Col>
 <Col xs={12} bsClass="litleBody col">
 <div style={{maxHeight:"450px",overflow:"auto"}}>
 <table className="table">
 <thead>
 <tr>
 <th>author</th>
 <th>estado</th>
 <th>fecha Creacion</th>
 <th>fecha Modificacion</th>
 <th>fecha Cierre</th>
 <th>Comentario</th>
 <th></th>
 </tr>
 </thead>
 <tbody>
 {props.tabla.map((elem,index)=>{
 return(
 <tr key={index}>
 <td>{elem.id_usuario}</td>
 <td>{props.source.find(x => x.value == elem.id_estado).label}</td>
 <td>{elem.fecha_creacion}</td>
 <td>{elem.fecha_modificacion}</td>
 <td>{elem.fecha_cierre}</td>
 <td></td>
 <td>
 <ButtonTable
 data={elem}
 icono="fa-pencil"
 click={(data)=>{
 props.dispatch(addModal({
 body:6,
 data:data,
 size:null
 }));
 }}
 />
 <ButtonTable
 data={elem}
 icono="fa-trash"
 click={(data)=>{}}
 />
 </td>
 </tr>
 )
 })}
 </tbody>
 </table>
 </div>
 </Col>
 </Row>*/