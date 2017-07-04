import React from 'react';
import { Row,Col,Form,Button } from 'react-bootstrap';
import { connect } from  'react-redux';
import { AutoComplete , InputSerie , Select, InputFecha, Input} from '../../componentFormulario/index.js'
import { cargarPlanta, altaNroSerie , cargarMarca ,cargarModelo,
    cargarSNMP,cargarSO,cargarXFS,cargarCarga,cargarEstado, cargarFRetiro,
    cargarFechaGarantia,cargarFechaInstalacion,cargarFechaEntrega,cargarTipoEquipo
    ,cargarFormulario,cargarEquipo,insertInstitucion,insertCliente,clearFormulario} from '../../../../actions/equipoAction.js';
import DualListBox from '../../../dualListBox/dualListBox.jsx';
import { changeSelectModule,changeSelectModuleAll,changeShowModule } from  '../../../../actions/sourceAction.js';


@connect((store)=>{
    return {
        Formulario: store.equipo.formulario,
        Source: store.source,
        cliente:store.app.cliente,
        request:store.app.Request,
        camposRequeridos:store.app.camposRequeridos
    }
})

export default class Formulario extends React.Component{

    endLoad(){
        if(this.completeForm()){
            this.props.onLoadFormulario(this.props.Formulario);
        }else{
            alert("esta imcompleto el formulario");
        }
    }

    completeForm(){
        let form = this.props.Formulario;
        let Requeridos = this.mergeCamposRqueridos();
        let valido = true;
        for(let i = 0; i < Requeridos.length;i++){
            if(!valido) break;
            switch (Requeridos[i]) {
                case 'marca':{
                    valido = !!form.marca;
                    break;
                }
                case 'planta':{
                    valido = !!form.planta;
                    break;
                }
                case 'modelo':{
                    valido = !!form.modelo;
                    break;
                }
                case 'serie':{
                    valido = !!form.nroSerie;
                    break;
                }
                case 'equipo':{
                    valido = !!form.Equipos;
                    break;
                }
                case 'tipo':{
                    valido = !!form.tipoEquipo;
                    break;
                }
                case 'snmp':{
                    valido = !!form.snmp;
                    break;
                }
                case 'so':{
                    valido = !!form.so;
                    break;
                }
                case 'xfs':{
                    valido = !!form.xfs;
                    break;
                }
                case 'carga':{
                    valido = !!form.carga;
                    break;
                }
                case 'estado':{
                    valido = !!form.estado;
                    break;
                }
                case 'entrega':{
                    valido = !!form.fEntrega;
                    break;
                }
                case 'instalacion':{
                    valido = !!form.fInstalacion;
                    break;
                }
                case 'garantia':{
                    valido = !!form.finGarantia;
                    break;
                }
                case 'retiro':{
                    valido = !!form.fRetiro;
                    break;
                }
                case 'cliente':{
                    valido = !!form.cliente;
                    break;
                }
                case 'institucion':{
                    valido = !!form.id_institucion;
                    break;
                }
                case 'modulos':{
                    valido = !!form.modulos;
                    break;
                }
            }
        }
        return valido;
    }

    componentWillUnmount(){
        this.props.dispatch(clearFormulario())
    }

    mergeCamposRqueridos(){
        let form = this.props.Formulario;
        if(form.cliente && form.cliente.camposRequeridos){
            let merge = [].concat(this.props.camposRequeridos.equipo,form.cliente.camposRequeridos.equipo);
            return merge.unique();
        }else{
            return this.props.camposRequeridos.equipo;
        }
    }

    render(){
        let form = this.props.Formulario;
        let defaultSelectMarca = form.marca ? form.marca["value"] : null;
        let defaultEquipo = form.Equipos ? form.Equipos["value"] : null;
        let Institucion = form.cliente && form.cliente.value ? form.cliente.institucion : [];
        let Requeridos = this.mergeCamposRqueridos();
        return(
            <Form horizontal>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <Select
                            label="Marca"
                            id="idMarca"
                            dataSource={this.props.Source.marcas}
                            default={form.marca}
                            required={Requeridos.find(x => x == 'marca')}
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
                            required={Requeridos.find(x => x == 'planta')}
                            onChange={(value)=>{
                                this.props.dispatch(cargarPlanta(value))
                            }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete
                            label="Modelo"
                            required={Requeridos.find(x => x == 'modelo')}
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
                                    required={Requeridos.find(x => x == 'serie')}
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
                                required={Requeridos.find(x => x == 'equipo')}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarEquipo(value));
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Tipo" id="idEquipo"
                                dataSource={form.Equipos ? this.props.Source.tipoEquipo[form.Equipos.value] : [] }
                                default={form.tipoEquipo}
                                required={Requeridos.find(x => x == 'tipo')}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarTipoEquipo(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="SNMP" id="idSNMP"
                                dataSource={this.props.Source.snmp}
                                default={form.snmp}
                                required={Requeridos.find(x => x == 'snmp')}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarSNMP(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="SO" id="idSO"
                                dataSource={this.props.Source.so}
                                default={form.so}
                                required={Requeridos.find(x => x == 'so')}
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
                                required={Requeridos.find(x => x == 'xfs')}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarXFS(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Carga" id="idCarga"
                                dataSource={this.props.Source.carga}
                                default={form.carga}
                                required={Requeridos.find(x => x == 'carga')}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarCarga(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select label="Estado" id="idEstado"
                                dataSource={this.props.Source.estado}
                                default={form.estado}
                                required={Requeridos.find(x => x == 'estado')}
                                returnSelect={(value)=>{
                                    this.props.dispatch(cargarEstado(value))
                                }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Entrega" id="idEntrega"
                                    format="DD-MM-YYYY"
                                    store={form.fEntrega}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFechaEntrega(value))
                                    }}
                                    require={Requeridos.find(x => x == 'entrega')}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Instalacion" id="idInstalacion"
                                    format="DD-MM-YYYY"
                                    store={form.fInstalacion}
                                    col={{label:3,input:9}}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFechaInstalacion(value))
                                    }}
                                    require={Requeridos.find(x => x == 'instalacion')}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Fin Garantia" id="idGarantia"
                                    format="DD-MM-YYYY"
                                    store={form.finGarantia}
                                    col={{label:4,input:8}}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFechaGarantia(value))
                                    }}
                                    require={Requeridos.find(x => x == 'garantia')}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <InputFecha label="Retiro" id="idRetiro"
                                    format="DD-MM-YYYY"
                                    store={form.fRetiro}
                                    returnDateInput={(value)=>{
                                        this.props.dispatch(cargarFRetiro(value))
                                    }}
                                    require={Requeridos.find(x => x == 'retiro')}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <AutoComplete
                            label="Cliente"
                            required={Requeridos.find(x => x == 'cliente')}
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
                            required={Requeridos.find(x => x == 'institucion')}
                            col={{label:3,input:9}}
                            store={form.id_institucion}
                            dataSource={Institucion}
                            onChange={(value)=>{
                                this.props.dispatch(insertInstitucion(value))
                            }}
                        />
                    </Col>
                    {(()=>{
                        if(this.props.hasOwnProperty("onCloseModal")){
                            return (
                                <Col xs={12} sm={6} md={4} style={{marginBottom:"5px"}}>
                                    <Row>
                                        <div className="col-xs-12 col-sm-10 col-sm-offset-2">
                                            <button
                                                className="btn btn-white separarButton btn-block"
                                                type="button"
                                                onClick={()=>{
                                                    this.props.onAignar();
                                                }}
                                            >
                                                Asignar o cambiar
                                            </button>
                                        </div>
                                    </Row>
                                </Col>
                            )
                        }else{
                            return null
                        }
                    })()}
                </Row>
                <Row bsClass="row boxConten">
                    <Col xs={12}>
                        <DualListBox
                            ref="DualBox"
                            dataSource={this.props.Source.modulos[defaultEquipo] ? this.props.Source.modulos[defaultEquipo] : []}
                            required={Requeridos.find(x => x == 'modulos')}
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
                        <Button bsClass="btn btn-white separarButton" disabled={!this.completeForm()} onClick={this.endLoad.bind(this)} >Agregar</Button>
                        {(()=>{
                            if(this.props.hasOwnProperty("onCloseModal")){
                                return <Button
                                    bsClass="btn btn-white separarButton"
                                    onClick={()=>{ this.props.onCloseModal()}} >
                                    Cerrar
                                </Button>
                            }
                        })()}
                    </Col>
                </Row>
            </Form>
        )
    }
}