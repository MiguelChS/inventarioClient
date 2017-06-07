/**
 * Created by mc185249 on 5/23/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row,Col } from 'react-bootstrap';
import ButtonTable from '../Component/ButtonTable.jsx';
import * as action from '../../../../actions/EquipoModificacionAction';

const mapStateToProps= (state)=>{
    return {
        tabla:state.equipoModi.tabla,
        source:state.source,
        cliente:state.app.cliente
    }
};

function map(props) {
    let row = [];
    for(let i = 0; i < props.tabla.length ; i++){
        if(i == 20) break;
        let equipo = props.tabla[i];
        row.push(
            <tr key={i}>
                <td>{equipo.nro_serie}</td>
                <td>{equipo.cliente_d1}</td>
                <td>{equipo.institucion_nombre}</td>
                <td>{equipo.tipo_equipo}</td>
                <td>{equipo.pais}</td>
                <td>{equipo.ciudad}</td>
                <td>{equipo.estado}</td>
                <td>{equipo.codigo_postal}</td>
                <td>{equipo.cliente_id}</td>
                <td>
                    <ButtonTable
                        data={equipo.id}
                        icono="fa-pencil"
                        click={(data)=>{props.dispatch(action.Editar(data,props.source,props.cliente))}}
                    />
                    <ButtonTable
                        data={equipo.id}
                        icono="fa-trash"
                        click={(data)=>{props.dispatch(action.Delete(data))}}
                    />
                </td>
            </tr>
        )
    }
    return row;
}


let resultado = (props)=>{
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
                            <th>Serial</th>
                            <th>Cliente</th>
                            <th>Institucion</th>
                            <th>Equipo</th>
                            <th>Pais</th>
                            <th>Ciudad</th>
                            <th>Estado</th>
                            <th>Codigo Postal</th>
                            <th>Cliente ID</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {map(props)}
                        </tbody>
                    </table>
                </div>
                <div>
                    <nav className="text-center">
                        <ul className="pagination no-margins" style={{paddingTop:"10px"}}>
                            <li>
                                <a href="#" >
                                    <span>&laquo;</span>
                                </a>
                            </li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li>
                                <a href="#">
                                    <span>&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
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

export default connect(mapStateToProps)(resultado)