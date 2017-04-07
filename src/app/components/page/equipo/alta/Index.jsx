import React from 'react';
import axios from 'axios';
import { Row,Col,Button } from 'react-bootstrap';
import Formulario from './Formulario.jsx';
import TableEquipo from './TableEquipo.jsx';
import {connect} from  'react-redux';
import {LoadTablaEA,FinishEA} from '../../../../actions/equipoAction.js';
import { searchSource } from '../../../../actions/sourceAction';

@connect((store)=>{
    return {
        source: store.source,
        tabla: store.equipo.tabla
    }
})
export default class Index extends React.Component{
    componentDidMount(){
        if(!this.props.source.complete){
            this.props.dispatch(searchSource());
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
                let formAux = JSON.parse(localStorage.getItem(key)).form;
                return {
                    "id_tipo_eq": formAux.tipoEquipo.value,
                    "id_tipo_equipo":formAux.Equipos.value,
                    "f_entrega":formAux.fEntrega,
                    "id_estado":formAux.estado.value,
                    "id_institucion": 0,
                    "id_posicion":formAux.position.value,
                    "f_retiro":formAux.fRetiro,
                    "f_inst":formAux.fInstalacion,
                    "f_fin_garantia":formAux.finGarantia,
                    "f_inicio_garantia":formAux.fEntrega,
                    "id_xfs":formAux.xfs.value,
                    "id_so":formAux.so.value,
                    "id_snmp":formAux.snmp.value,
                    "id_carga":formAux.carga.value,
                    "id_modulos":formAux.modulos.map( obj => obj.value),
                    "id_modelo":formAux.modelo.value,
                    "nro_serie":`${formAux.planta.prefijo}-${formAux.nroSerie}`,
                    "id_planta":formAux.planta.value,
                    "id_user":0,
                    "id_equipo_ncr":formAux.equipoNcr
                }
            });
            axios.post("http://153.72.46.242:3000/equipo",form[0])
                .then((resul)=>{
                    console.log(resul);
                })
                .catch((err)=>{
                   console.log(err);
                });
            console.log(form);
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