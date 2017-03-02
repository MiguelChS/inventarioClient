import React from 'react';
import { Row,Col,Form,Button } from 'react-bootstrap';
import AutoComplete from  '../../componentFormulario/autoComplete.jsx';
import { connect } from  'react-redux';
import InputSerie from '../../componentFormulario/InputSerie.jsx';
import { cargarPlanta, altaNroSerie } from '../../../../actions/equipoAction.js';

@connect((store)=>{
    return {
        Formulario: store.equipo.formulario,
        Source: store.equipo.source
    }
})

export default class Formulario extends React.Component{

    validar(){
        console.log(this.props);
    }

    render(){
        let defaultAutoPlanta = this.props.Formulario.planta ? this.props.Formulario.planta["value"] : null;
        return(
            <Form horizontal>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete label="Planta" id="idPlanta"
                                      dataSource={this.props.Source.planta}
                                      default={defaultAutoPlanta}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(cargarPlanta(value))
                                      }}/>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputSerie label="Serie"
                                    id="idSerial"
                                    placeHolder="N° Serie"
                                    storeValue={this.props.Formulario.nroSerie}
                                    storeValueNoTipeo={this.props.Formulario.planta}
                                    changeInput={(value)=>{
                                        this.props.dispatch(altaNroSerie(value))
                                    }} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} bsClass="text-center col">
                        <Button bsClass="btn btn-white" onClick={this.validar.bind(this)} >Agregar</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
/*

<Col xs={12} sm={6} md={4}>
 <Input label="Serie" id="idSerial" placeHolder="N° Serie" returnInput={(e)=>{}}/>
 </Col>
              <Col xs={12} sm={6} md={4}>
 <Select label="Marca" id="idMarca" dataSource={this.state.source.marcas} returnSelect={}/>
 </Col>
 <Col xs={12} sm={6} md={4}>
 <AutoComplete label="Modelo" id="idModelo" ref="Modelo" dataSource={this.state.source.modelo} resultadoAutoComplete={(e)=>{this.setState({Modelo:e})}} />
 </Col>
 <Col xs={12} sm={6} md={4}>
 <Select label="SNMP" id="idSNMP" dataSource={this.state.source.snmp} returnSelect={(e)=>{this.setState({Snmp:e})}}/>
 </Col>
 <Col xs={12} sm={6} md={4}>
 <Select label="SO" id="idSO" dataSource={this.state.source.so} returnSelect={(e)=>{this.setState({So:e})}}/>
 </Col>
 <Col xs={12} sm={6} md={4}>
 <Select label="xfs" id="idxfs" dataSource={this.state.source.xfs} returnSelect={(e)=>{this.setState({xfs:e})}}/>
 </Col>
 <Col xs={12} sm={6} md={4}>
 <Select label="Carga" id="idCarga" dataSource={this.state.source.carga} returnSelect={(e)=>{this.setState({Carga:e})}}/>
 </Col>
 <Col xs={12} sm={6} md={4}>
 <Select label="Estado" id="idEstado" dataSource={this.state.source.estado} returnSelect={(e)=>{this.setState({Estado:e})}}/>
 </Col>
 <Col xs={12} sm={6} md={4}>
 <InputFecha label="Retiro" id="idRetiro" format="DD-MM-YYYY" returnDateInput={(e)=>{this.setState({fRetiro:e})}} />
 </Col>
 <Col xs={12} sm={6} md={4}>
 <Select label="Garantia" id="idGarantia" dataSource={this.state.source.garantia} returnSelect={(e)=>{this.setState({Garantia:e})}}/>
 </Col>
 <Col xs={12} sm={6} md={4}>
 <InputFecha label="Garantia" id="idGarantia" format="DD-MM-YYYY" dual="true" returnDateInput={(e)=>{this.setState({iniGarantia:e.f1,finGarantia:e.f2})}}/>
 </Col>
 <Col xs={12} sm={6} md={4}>
 <InputFecha label="Entrega" id="idEntrega" format="DD-MM-YYYY" returnDateInput={(e)=>{this.setState({fEntrega:e})}} />
 </Col>
 <Col xs={12} sm={6} md={4}>
 <InputFecha label="Instalacion" id="idInstalacion" format="DD-MM-YYYY" col={{label:3,input:9}} returnDateInput={(e)=>{this.setState({fInstalacion:e})}}/>
 </Col>
 <Row bsClass="row boxConten">
 <Col xs={12}>
 <DualListBox dataSource={this.state.testModulos}/>
 </Col>
 </Row>
 */