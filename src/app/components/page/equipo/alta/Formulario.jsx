import React from 'react';
import { Row,Col,Form,Button } from 'react-bootstrap';
import { connect } from  'react-redux';
import { AutoComplete , InputSerie , Select, InputFecha} from '../../componentFormulario/index.js'
import { cargarPlanta, altaNroSerie , cargarMarca ,cargarModelo,
    cargarSNMP,cargarSO,cargarXFS,cargarCarga,cargarEstado, cargarFRetiro, cargarGarantia,
    cargarFechaGarantia,cargarFechaInstalacion,cargarFechaEntrega,cargarTipoEquipo,changeSelectModule,
    changeDefaultModule,changeSelectModuleAll,changeShowModule,validarFormulario} from '../../../../actions/equipoAction.js';
import DualListBox from '../../../dualListBox/dualListBox.jsx';


@connect((store)=>{
    return {
        Formulario: store.equipo.formulario,
        Source: store.equipo.source
    }
})

export default class Formulario extends React.Component{

    validar(){
        this.props.dispatch(validarFormulario());
    }

    buscarModelo(value){
        this.refs.planta.refs.AutoComplete.setState({indiceSourceSelect:null,showResult:"none",text:'',result:[]});
        this.refs.Modelo.refs.AutoComplete.setState({indiceSourceSelect:null,showResult:"none",text:'',result:[]});
        this.props.dispatch(cargarMarca(value));
        this.props.dispatch(cargarModelo(null));
        this.props.dispatch(cargarPlanta(null));
    }


    render(){
        let defaultAutoPlanta = this.props.Formulario.planta ? this.props.Formulario.planta["value"] : null;
        let defaultSelectMarca = this.props.Formulario.marca ? this.props.Formulario.marca["value"] : null;
        let defaultSelectModelo = this.props.Formulario.modelo ? this.props.Formulario.modelo["value"] : null;
        let defaultSelectSNMP = this.props.Formulario.snmp ? this.props.Formulario.snmp["value"] : null;
        let defaultSelectSO = this.props.Formulario.so ? this.props.Formulario.so["value"] : null;
        let defaultSelectXFS = this.props.Formulario.xfs ? this.props.Formulario.xfs["value"] : null;
        let defaultCarga = this.props.Formulario.carga ? this.props.Formulario.carga["value"] : null;
        let defaultEstado = this.props.Formulario.estado ? this.props.Formulario.estado["value"] : null;
        let defaultGarantia = this.props.Formulario.garantia ? this.props.Formulario.garantia["value"] : null;
        let defaultTipoEquipo = this.props.Formulario.tipoEquipo ? this.props.Formulario.tipoEquipo["value"] : null;
        return(
            <Form horizontal>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <Select
                            label="Marca"
                            id="idMarca"
                            dataSource={this.props.Source.marcas}
                            default={defaultSelectMarca}
                            required={true}
                            returnSelect={(value)=>{
                                this.buscarModelo(value);
                            }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete label="Planta" id="idPlanta"
                                      ref="planta"
                                      dataSource={this.props.Source.planta[defaultSelectMarca] ? this.props.Source.planta[defaultSelectMarca] : []}
                                      default={defaultAutoPlanta}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(cargarPlanta(value))
                                      }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete
                            label="Modelo"
                            id="idModelo"
                            ref="Modelo"
                            required={true}
                            dataSource={this.props.Source.modelo[defaultSelectMarca] ? this.props.Source.modelo[defaultSelectMarca] : []}
                            default={defaultSelectModelo}
                            resultadoAutoComplete={(value)=>{
                                this.props.dispatch(cargarModelo(value))
                            }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputSerie label="Serie"
                                    id="idSerial"
                                    placeHolder="N° Serie"
                                    required={true}
                                    storeValue={this.props.Formulario.nroSerie}
                                    storeValueNoTipeo={this.props.Formulario.planta}
                                    changeInput={(value)=>{
                                        this.props.dispatch(altaNroSerie(value))
                                    }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Tipo" id="idEquipo"
                                dataSource={this.props.Source.tipoEquipo}
                                default={defaultTipoEquipo}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(changeDefaultModule());
                                    this.props.dispatch(cargarTipoEquipo(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="SNMP" id="idSNMP"
                                dataSource={this.props.Source.snmp}
                                default={defaultSelectSNMP}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarSNMP(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="SO" id="idSO"
                                dataSource={this.props.Source.so}
                                default={defaultSelectSO}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarSO(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="xfs"
                                id="idxfs"
                                dataSource={this.props.Source.xfs}
                                default={defaultSelectXFS}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarXFS(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Carga" id="idCarga"
                                dataSource={this.props.Source.carga}
                                default={defaultCarga}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarCarga(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Estado" id="idEstado"
                                dataSource={this.props.Source.estado}
                                default={defaultEstado}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarEstado(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Garantia" id="idGarantia"
                                dataSource={this.props.Source.garantia}
                                default={defaultGarantia}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarGarantia(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Entrega" id="idEntrega"
                                    format="DD-MM-YYYY"
                                    default={{date1:this.props.Formulario.fEntrega}}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFechaEntrega(value))
                                    }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Instalacion" id="idInstalacion"
                                    format="DD-MM-YYYY"
                                    default={{date1:this.props.Formulario.fInstalacion}}
                                    col={{label:3,input:9}}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFechaInstalacion(value))
                                    }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Garantia" id="idGarantia"
                                    format="DD-MM-YYYY"
                                    dual="true"
                                    default={{date1:this.props.Formulario.iniGarantia,date2:this.props.Formulario.finGarantia}}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFechaGarantia(value))
                                    }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Retiro" id="idRetiro"
                                    format="DD-MM-YYYY"
                                    default={{date1:this.props.Formulario.fRetiro}}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFRetiro(value))
                                    }}
                        />
                    </Col>
                </Row>
                <Row bsClass="row boxConten">
                    <Col xs={12}>
                        <DualListBox
                            ref="DualBox"
                            dataSource={this.props.Source.modulos[defaultTipoEquipo] ? this.props.Source.modulos[defaultTipoEquipo] : []}
                            required={true}
                            select={(value)=>{
                                this.props.dispatch(changeSelectModule(value))
                            }}
                            selectAll={(value)=>{
                                this.props.dispatch(changeSelectModuleAll(value))
                            }}
                            changeShow={(value)=>{
                                this.props.dispatch(changeShowModule(value))
                            }}
                        />
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