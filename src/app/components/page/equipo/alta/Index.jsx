import React from 'react';
import { Row,Col,Button } from 'react-bootstrap';
import Formulario from './Formulario.jsx';
import TableEquipo from './TableEquipo.jsx';
import {connect} from  'react-redux';
import {BuscarSource,LoadTablaEA,FinishEA} from '../../../../actions/equipoAction.js';

@connect((store)=>{
    return {
        source: store.equipo.source,
        tabla: store.equipo.tabla
    }
})
export default class Index extends React.Component{
    componentDidMount(){
        if(!this.props.source.complete){
            this.props.dispatch(BuscarSource());
        }
        let EA = Object.keys(localStorage).filter( item => /_EA$/.test(item));
        if(EA.length > 0){
            this.props.dispatch(LoadTablaEA());
        }
    }

    componentWillUnmount(){
        let EA = Object.keys(localStorage).filter( item => /_EA$/.test(item));
        if(EA.length > 0){
            /*this.props.dispatch({
                type:"ADD_MODAL",
                title:"",
                body: 2,
                buttonConf:"Aceptar",
                data:{mjs:"¿Desea guardar el trabajo realizado?"}
            })*/
        }
    }

    finishLoading(){
        if(!this.disabledBtnTerm){
            let EA = Object.keys(localStorage).filter( item => /_EA$/.test(item));
            let form = EA.map((key)=>{
                return JSON.parse(localStorage.getItem(key)).form;
            });
            this.props.dispatch(FinishEA(form))
        }
    }


    render(){
        const style = {
            marginRight:"0",
            marginLeft:"0",
            paddingBottom: "10px",
            borderBottom: "2px solid #e7eaec"
        };
        this.disabledBtnTerm = this.props.tabla.length == 0;
        return(
            <Row style={style} bsClass="row wrapperWhite">
                <Col xs={12} bsClass="litleHeader col">
                    <h5> Alta de Equipo </h5>
                </Col>
                <Col xs={12} bsClass="litleBody col">
                    <Formulario/>
                    <div className="hr-line-dashed"/>
                    <TableEquipo />
                    <div className="hr-line-dashed"/>
                    <Button bsClass="btn btn-white"
                            disabled={this.disabledBtnTerm}
                            onClick={this.finishLoading.bind(this)} >
                        Finalizar Carga
                    </Button>
                </Col>
            </Row>
        )
    }
}