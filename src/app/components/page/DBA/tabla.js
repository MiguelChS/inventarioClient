import React from 'react';
import { connect } from 'react-redux';
import { addModal } from '../../../actions/modalAction.js'
import {Ibox,Tabla} from '../componentFormulario'

let tabla = (props)=>{
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
            source={props.tabla}
        />
    </Ibox>
    )
};

let mapStateToProps = (state)=>{
    return {
        tabla: state.dba.tabla,
        source: state.dba.stateSoucer,
        request: state.app.Request
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