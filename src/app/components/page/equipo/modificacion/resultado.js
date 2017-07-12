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

}


class resultado extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectPage:0
        }
    }

    map(){
        let row = [];
        for(let i = (this.state.selectPage * 20); i < this.props.tabla.length ; i++){
            if(i == ((this.state.selectPage * 20) + 20)) break;
            let equipo = this.props.tabla[i];
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
                    {(()=>{
                        if(equipo.pendiente_aprobacion) return <td></td>;
                        return(
                            <td>
                                <ButtonTable
                                    data={equipo.id}
                                    icono="fa-pencil"
                                    click={(data)=>{this.props.dispatch(action.Editar(data,this.props.source,this.props.cliente))}}
                                />
                                <ButtonTable
                                    data={equipo.id}
                                    icono="fa-trash"
                                    click={(data)=>{this.props.dispatch(action.Delete(data))}}
                                />
                            </td>
                        )

                    })()}
                </tr>
            )
        }
        return row;
    }

    selectPage(page){
        this.setState({selectPage:page})
    }


    render(){
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
                            {this.map()}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <nav className="text-center">
                            <ul className="pagination no-margins" style={{paddingTop:"10px"}}>
                                <li>
                                    <a role="button">
                                        <span>&laquo;</span>
                                    </a>
                                </li>
                                {(()=>{
                                    let li = [];
                                    for(let i =0;i<(this.props.tabla.length / 20);i++){
                                         li.push(<li key={i}>
                                             <a role="button"
                                                onClick={()=>{
                                                    this.selectPage(i);
                                                }}
                                             >
                                                 {i + 1}
                                             </a>
                                         </li>)
                                    }
                                    return li;
                                })()}
                                <li>
                                    <a role="button">
                                        <span>&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Col>
            </Row>
        )
    }
}

const style = {
    marginRight:"0",
    marginLeft:"0",
    paddingBottom: "10px",
    borderBottom: "2px solid #e7eaec"
};

export default connect(mapStateToProps)(resultado)