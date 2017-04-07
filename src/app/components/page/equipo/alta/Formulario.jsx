import React from 'react';
import { Row,Col,Form,Button } from 'react-bootstrap';
import { connect } from  'react-redux';
import { AutoComplete , InputSerie , Select, InputFecha, Input} from '../../componentFormulario/index.js'
import { cargarPlanta, altaNroSerie , cargarMarca ,cargarModelo,
    cargarSNMP,cargarSO,cargarXFS,cargarCarga,cargarEstado, cargarFRetiro,
    cargarFechaGarantia,cargarFechaInstalacion,cargarFechaEntrega,cargarTipoEquipo
    ,validarFormulario,cargarEquipo,ingresarModulos,cargarEquipoNcr} from '../../../../actions/equipoAction.js';
import DualListBox from '../../../dualListBox/dualListBox.jsx';
import { loadAuto } from '../../../../actions/autoCompleteAction.js';
import { changeSelectModule,changeDefaultModule,changeSelectModuleAll,changeShowModule } from  '../../../../actions/sourceAction.js';


@connect((store)=>{
    return {
        Formulario: store.equipo.formulario,
        Source: store.source,
        AutoPlanta: store.AutoComplete.find( obj => obj.id == "idPlanta"),
        AutoModelo: store.AutoComplete.find( obj => obj.id == "idModelo")
    }
})

export default class Formulario extends React.Component{
    constructor(props){
        super(props);
        this.btnAdd = true;
    }

    validar(){
        let form = this.props.Formulario;
        if(form.marca && form.nroSerie && form.modelo && form.modulos && form.carga && form.snmp && form.so && form.tipoEquipo && form.Equipos && form.estado && form.planta && form.equipoNcr){
            this.props.dispatch(validarFormulario([{...this.props.AutoPlanta},{...this.props.AutoModelo}]));
            this.props.dispatch(changeDefaultModule());
            this.props.dispatch(loadAuto({id:this.props.AutoPlanta.id,state:{}}));
            this.props.dispatch(loadAuto({id:this.props.AutoModelo.id,state:{}}));
        }else{
            alert("esta imcompleto el formulario");
        }
    }

    insertMarca(value){
        let storePlanta = this.props.AutoPlanta;
        let storeModelo = this.props.AutoModelo;

        this.props.dispatch(loadAuto({id:storePlanta.id,state:{}}));
        this.props.dispatch(loadAuto({id:storeModelo.id,state:{}}));

        this.props.dispatch(cargarMarca(value));
        this.props.dispatch(cargarModelo(null));
        this.props.dispatch(cargarPlanta(null));
    }

    disabledBtn(){
        let form = this.props.Formulario;
        this.btnAdd = !(form.marca && form.nroSerie && form.modelo && form.modulos && form.carga && form.snmp && form.so && form.tipoEquipo && form.Equipos && form.estado && form.planta && form.equipoNcr);
    }

    render(){
        this.disabledBtn();
        let defaultSelectMarca = this.props.Formulario.marca ? this.props.Formulario.marca["value"] : null;
        let defaultSelectSNMP = this.props.Formulario.snmp ? this.props.Formulario.snmp["value"] : null;
        let defaultSelectSO = this.props.Formulario.so ? this.props.Formulario.so["value"] : null;
        let defaultSelectXFS = this.props.Formulario.xfs ? this.props.Formulario.xfs["value"] : null;
        let defaultCarga = this.props.Formulario.carga ? this.props.Formulario.carga["value"] : null;
        let defaultEstado = this.props.Formulario.estado ? this.props.Formulario.estado["value"] : null;
        let defaultTipoEquipo = this.props.Formulario.tipoEquipo ? this.props.Formulario.tipoEquipo["value"] : null;
        let defaultEquipo = this.props.Formulario.Equipos ? this.props.Formulario.Equipos["value"] : null;
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
                            default={defaultSelectMarca}
                            required={true}
                            returnSelect={(value)=>{
                                this.insertMarca(value);
                            }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete label="Planta"
                                      id="idPlanta"
                                      dataSource={this.props.Source.planta[defaultSelectMarca] ? this.props.Source.planta[defaultSelectMarca] : []}
                                      Store={this.props.AutoPlanta}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(cargarPlanta(value))
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete
                            label="Modelo"
                            id="idModelo"
                            Store={this.props.AutoModelo}
                            required={true}
                            dataSource={this.props.Source.modelo[defaultSelectMarca] ? this.props.Source.modelo[defaultSelectMarca] : []}
                            resultadoAutoComplete={(value)=>{
                                this.props.dispatch(cargarModelo(value))
                            }}
                            dispatch={this.props.dispatch}
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
                                default={defaultEquipo}
                                required={true}
                                returnSelect={(value)=>{
                                    this.props.dispatch(ingresarModulos(null));
                                    this.props.dispatch(changeDefaultModule());
                                    this.props.dispatch(cargarEquipo(value));

                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Tipo" id="idEquipo"
                                dataSource={this.props.Source.tipoEquipo[defaultEquipo] ? this.props.Source.tipoEquipo[defaultEquipo] : [] }
                                default={defaultTipoEquipo}
                                required={true}
                                returnSelect={(value)=>{
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
                        <InputFecha label="Fin Garantia" id="idGarantia"
                                    format="DD-MM-YYYY"
                                    default={{date1:this.props.Formulario.finGarantia}}
                                    col={{label:4,input:8}}
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
                            dataSource={this.props.Source.modulos[defaultEquipo] ? this.props.Source.modulos[defaultEquipo] : []}
                            required={true}
                            select={(value)=>{
                                this.props.dispatch(changeSelectModule(value,this.props.Source.modulos))
                            }}
                            selectAll={(value)=>{
                                this.props.dispatch(changeSelectModuleAll(value,this.props.Source.modulos))
                            }}
                            changeShow={(value)=>{
                                this.props.dispatch(changeShowModule(value,this.props.Source.modulos))
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} bsClass="text-center col">
                        <Button bsClass="btn btn-white" disabled={this.btnAdd} onClick={this.validar.bind(this)} >Agregar</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}