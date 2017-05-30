import React from 'react';
import { Row,Col,Form,Button } from 'react-bootstrap';
import { connect } from  'react-redux';
import { AutoComplete , InputSerie , Select, InputFecha, Input} from '../../componentFormulario/index.js'
import { cargarPlanta, altaNroSerie , cargarMarca ,cargarModelo,
    cargarSNMP,cargarSO,cargarXFS,cargarCarga,cargarEstado, cargarFRetiro,
    cargarFechaGarantia,cargarFechaInstalacion,cargarFechaEntrega,cargarTipoEquipo
    ,cargarFormulario,cargarEquipo,cargarEquipoNcr,insertInstitucion,insertCliente} from '../../../../actions/equipoAction.js';
import DualListBox from '../../../dualListBox/dualListBox.jsx';
import { changeSelectModule,changeSelectModuleAll,changeShowModule } from  '../../../../actions/sourceAction.js';


@connect((store)=>{
    return {
        Formulario: store.equipo.formulario,
        Source: store.source,
        cliente:store.app.cliente,
        request:store.app.Request
    }
})

export default class Formulario extends React.Component{
    constructor(props){
        super(props);
        this.btnAdd = true;
    }

    endLoad(){
        if(this.completeForm()){
            this.props.dispatch(cargarFormulario())
        }else{
            alert("esta imcompleto el formulario");
        }
    }

    completeForm(){
        let form = this.props.Formulario;
        return (form.marca && form.nroSerie && form.modelo && form.modulos && form.carga && form.snmp && form.so && form.tipoEquipo && form.Equipos && form.estado && form.planta && form.equipoNcr && form.id_institucion);
    }

    render(){
        let form = this.props.Formulario;
        let defaultSelectMarca = form.marca ? form.marca["value"] : null;
        let defaultEquipo = form.Equipos ? form.Equipos["value"] : null;
        let Institucion = form.cliente && form.cliente.value ? form.cliente.institucion : [];
        return(
            <Form horizontal>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                       <Input
                           label="Equipo Ncr"
                           id="idEqNcr"
                           value={this.props.Formulario.equipoNcr}
                           placeholder="NCR ID"
                           required={true}
                           returnValue={(value)=>{
                               this.props.dispatch(cargarEquipoNcr(value))
                           }}
                           col={{label:3,input:9}}
                       />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select
                            label="Marca"
                            id="idMarca"
                            dataSource={this.props.Source.marcas}
                            default={form.marca}
                            required={true}
                            returnSelect={(value)=>{
                                this.props.dispatch(cargarMarca(value));
                            }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete
                            label="Planta"
                            store={form.planta}
                            dataSource={this.props.Source.planta[defaultSelectMarca] ? this.props.Source.planta[defaultSelectMarca] : []}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(cargarPlanta(value))
                            }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete
                            label="Modelo"
                            required={true}
                            store={form.modelo}
                            dataSource={this.props.Source.modelo[defaultSelectMarca] ? this.props.Source.modelo[defaultSelectMarca] : []}
                            onChange={(value)=>{
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
                        <Select label="Equipo" id="idEquipo"
                                dataSource={this.props.Source.Equipos}
                                default={form.Equipos}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarEquipo(value));
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Tipo" id="idEquipo"
                                dataSource={form.Equipos ? this.props.Source.tipoEquipo[form.Equipos.value] : [] }
                                default={form.tipoEquipo}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarTipoEquipo(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="SNMP" id="idSNMP"
                                dataSource={this.props.Source.snmp}
                                default={form.snmp}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarSNMP(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="SO" id="idSO"
                                dataSource={this.props.Source.so}
                                default={form.so}
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
                                default={form.xfs}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarXFS(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Carga" id="idCarga"
                                dataSource={this.props.Source.carga}
                                default={form.carga}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarCarga(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Estado" id="idEstado"
                                dataSource={this.props.Source.estado}
                                default={form.estado}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarEstado(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Entrega" id="idEntrega"
                                    format="DD-MM-YYYY"
                                    default={{date1:form.fEntrega}}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFechaEntrega(value))
                                    }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Instalacion" id="idInstalacion"
                                    format="DD-MM-YYYY"
                                    default={{date1:form.fInstalacion}}
                                    col={{label:3,input:9}}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFechaInstalacion(value))
                                    }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Fin Garantia" id="idGarantia"
                                    format="DD-MM-YYYY"
                                    default={{date1:form.finGarantia}}
                                    col={{label:4,input:8}}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFechaGarantia(value))
                                    }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Retiro" id="idRetiro"
                                    format="DD-MM-YYYY"
                                    default={{date1:form.fRetiro}}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFRetiro(value))
                                    }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete
                            label="Cliente"
                            required={true}
                            col={{label:3,input:9}}
                            store={form.cliente}
                            dataSource={this.props.cliente}
                            onChange={(value)=>{
                                this.props.dispatch(insertCliente(value))
                            }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete
                            label="Institucion"
                            required={true}
                            col={{label:3,input:9}}
                            store={form.id_institucion}
                            dataSource={Institucion}
                            onChange={(value)=>{
                                this.props.dispatch(insertInstitucion(value))
                            }}
                        />
                    </Col>
                </Row>
                <Row bsClass="row boxConten">
                    <Col xs={12}>
                        <DualListBox
                            ref="DualBox"
                            dataSource={this.props.Source.modulos[defaultEquipo] ? this.props.Source.modulos[defaultEquipo] : []}
                            required={true}
                            select={(value)=>{
                                this.props.dispatch(changeSelectModule(value,this.props.Source,form.prestacion))
                            }}
                            selectAll={(value)=>{
                                this.props.dispatch(changeSelectModuleAll(value,this.props.Source,form.prestacion))
                            }}
                            changeShow={(value)=>{
                                this.props.dispatch(changeShowModule(value))
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} bsClass="text-center col">
                        <Button bsClass="btn btn-white" disabled={!this.completeForm()} onClick={this.endLoad.bind(this)} >Agregar</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}