import React from 'react';
import request from '../../../../Request/Request';
import { Row,Col,Button } from 'react-bootstrap';
import Formulario from './Formulario.jsx';
import TableEquipo from './TableEquipo.jsx';
import {connect} from  'react-redux';
import {LoadTablaEA,FinishEA,sendForm,loadStateSendForm, envioEquipo} from '../../../../actions/equipoAction.js';
import { searchSource  } from '../../../../actions/sourceAction';

@connect((store)=>{
    return {
        source: store.source,
        tabla: store.equipo.tabla,
        ProcessSend: store.equipo.ProcessSend
    }
})
export default class Index extends React.Component{
    componentDidMount(){
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
            this.props.dispatch(envioEquipo())
        }
    }


    render(){
        const style = {
            marginRight:"0",
            marginLeft:"0",
            paddingBottom: "10px",
            borderBottom: "2px solid #e7eaec"
        };
        this.disabledBtnTerm = !(!this.props.ProcessSend && this.props.tabla.length != 0);
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