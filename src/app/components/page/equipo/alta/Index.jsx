import React from 'react';
import { Row,Col,Button } from 'react-bootstrap';
import Formulario from './Formulario.jsx';
import TableEquipo from './TableEquipo.jsx';
import {connect} from  'react-redux';
import {BuscarSource} from '../../../../actions/equipoAction.js';

@connect((store)=>{
    return {
        source: store.equipo.source
    }
})
export default class Index extends React.Component{
    componentDidMount(){
        if(!this.props.source.complete){
            this.props.dispatch(BuscarSource());
        }
    }

    render(){
        const style = {
            marginRight:"0",
            marginLeft:"0",
            paddingBottom: "10px",
            borderBottom: "2px solid #e7eaec"
        };
        return(
            <Row style={style} bsClass="row wrapperWhite">
                <Col xs={12} bsClass="litleHeader col">
                    <h5> Alta de Equipo </h5>
                </Col>
                <Col xs={12} bsClass="litleBody col">
                    <Formulario/>
                    <div className="hr-line-dashed"/>
                    <TableEquipo openModal={()=>{}}/>
                    <div className="hr-line-dashed"/>
                    <Button bsClass="btn btn-white">Finalizar Carga</Button>
                </Col>
            </Row>
        )
    }
}