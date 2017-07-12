import React from 'react';
import { connect } from 'react-redux';
import { Row,Col } from 'react-bootstrap';
import ButtonTable from './ButtonTable.jsx';

let tabla = (props)=>{
    return(
        <Row style={{...style,...{marginTop:"10px"}}} bsClass="row wrapperWhite">
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
                                <tr>
                                    <td>{elem.id_usuario}</td>
                                    <td>{elem.id_stado}</td>
                                    <td>{elem.fecha_creacion}</td>
                                    <td>{elem.fecha_modificacion}</td>
                                    <td>{elem.fecha_cierre}</td>
                                    <td></td>
                                    <td>
                                        <ButtonTable
                                            data={elem}
                                            icono="fa-pencil"
                                            click={(data)=>{}}
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
        </Row>
    )
};

const style = {
    marginRight:"0",
    marginLeft:"0",
    paddingBottom: "10px",
    borderBottom: "2px solid #e7eaec"
};

let mapStateToProps = (state)=>{
    return {
        tabla: state.dba.tabla,
        request: state.app.Request
    }
};

export default connect(mapStateToProps)(tabla);

