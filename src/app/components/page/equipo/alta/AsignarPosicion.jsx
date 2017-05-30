import React from 'react';
import { connect } from  'react-redux';
import { Row,Col,Form } from 'react-bootstrap';
import { AutoComplete } from '../../componentFormulario/index.js'
import { hiddenModal,addModal } from '../../../../actions/modalAction.js'
import { assignPosition } from '../../../../actions/equipoAction.js';
import * as action from '../../../../actions/AsignarPosicionAction';
import BoxFilter from '../../../boxFilter/index.jsx';

@connect((store)=>{
    return{
        request:store.app.Request,
        store:store.assignPosicion
    }
})
export default class AsignarPosicion extends React.Component{

    assign(){
        let props = this.props.store;
        this.props.dispatch([
            assignPosition({
                site:props.Site,
                SiteClient:props.SiteClient,
                position:props.posicion,
                formid:this.props.data,
                prestacion:props.prestacion,
                newPosicion:props.newPosicion
            }),
            hiddenModal(this.props.idModal)
        ])
    }

    cancelar(){
        this.props.dispatch([
            hiddenModal(this.props.idModal),
            action.clearForm()
        ])
    }

    newPosition(){
        this.props.dispatch(addModal({
            body:2,
            data:{
                onEndLoadFormulario:(form)=>{
                    this.props.dispatch(action.insertNuevaPosicion(form))
                }
            },
            size:"xl"
        }))
    }

    editarNuevaPosicion(){
        let form = this.props.store.newPosicion;
        this.props.dispatch(addModal({
            body:2,
            data:{
                onEndLoadFormulario:(form)=>{
                    this.props.dispatch(action.insertNuevaPosicion(form))
                },
                default:form
            },
            size:"xl"
        }))
    }

    componentDidMount(){
        //Buscar los sites
        let form = JSON.parse(localStorage.getItem(this.props.data));
        this.props.dispatch([
            action.preCargaFormulario(form)
        ])
    }

    render(){
        let props = this.props.store;
        return(
            <Form horizontal>
                <h4 className="titleModal">Asignar Posicion</h4>
                <div className="hr-line-dashed"/>
                <Row>
                    <Col xs={12}>
                        <AutoComplete
                            label="Site"
                            dataSource={props.siteSource}
                            store={props.Site}
                            col={{input:9,label:3}}
                            required={true}
                            disabled={this.props.request}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertSite(value))
                            }}
                        />
                    </Col>
                </Row>
                {(()=>{
                    if(!props.newPosicion){
                        return(
                            <Row>
                                <Col xs={12} >
                                    <AutoComplete
                                        label="Posicion"
                                        col={{input:9,label:3}}
                                        dataSource={props.posicionSource}
                                        disabled={(this.props.request || props.newPosicion)}
                                        store={props.posicion}
                                        required={true}
                                        onChange={(value)=>{
                                            this.props.dispatch(action.insertPosicion(value))
                                        }}
                                    />
                                </Col>
                            </Row>
                        )
                    }
                    return(
                        <div className="row text-center" style={{marginBottom:"10px"}}>
                            <strong>Nueva posicion :</strong> {props.newPosicion.nombrePoscion}
                            <button type="button"
                                    style={{marginLeft:"20px"}}
                                    onClick={this.editarNuevaPosicion.bind(this)}
                                    className="btn btn-white btn-xs separarButton">
                                <i className={`fa fa-pencil`}/>
                            </button>
                            <button type="button" className="btn btn-white btn-xs separarButton"
                                    onClick={()=>{this.props.dispatch(action.insertNuevaPosicion(null))}}>
                                <i className={`fa fa-trash`}/>
                            </button>
                        </div>
                    )
                })()}
                <Row>
                    <Col xs={12} >
                        {(()=> {
                            if (props.prestacion.length == 0) return null;
                            return(
                                <BoxFilter
                                    data={props.prestacion}
                                    result={(value)=>{
                                        this.props.dispatch(action.insertHoraPrestacion(value));
                                    }}
                                />
                            )
                        })()}
                    </Col>
                </Row>
                <Row>
                    <div className="col-xs-12 text-right">
                        <div className="btn-group separarButton">
                            <button type="button"
                                    disabled={(this.props.request || props.newPosicion)}
                                    onClick={this.newPosition.bind(this)} className="btn btn-white">
                                Nueva Posicion
                            </button>
                        </div>
                        <div className="btn-group separarButton">
                            <button type="button" disabled={this.props.request} onClick={this.assign.bind(this)} className="btn btn-white">
                                Asignar
                            </button>
                        </div>
                        <div className="btn-group separarButton">
                            <button type="button" disabled={this.props.request} onClick={this.cancelar.bind(this)}  className="btn btn-white">
                                cancelar
                            </button>
                        </div>
                    </div>
                </Row>
            </Form>
        )
    }
}
