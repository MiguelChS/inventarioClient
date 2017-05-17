import React from 'react';
import { connect } from  'react-redux';
import { Row,Col,Form } from 'react-bootstrap';
import { AutoComplete } from '../../componentFormulario/index.js'
import { hiddenModal,addModal } from '../../../../actions/modalAction.js'
import { assignPosition } from '../../../../actions/equipoAction.js';
import * as action from '../../../../actions/AsignarPosicionAction';
import { insertTemporalPosicion } from '../../../../actions/sourceAction'
import { changeParentApp } from '../../../../actions/appAction';
import Request from '../../../../Request/Request'
import BoxFilter from '../../../boxFilter/index.jsx';

@connect((store)=>{
    return{
        source:store.source,
        request:store.app.Request,
        store:store.assignPosicion
    }
})
export default class AsignarPosicion extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            horaPrestacion:[],
            prestacion:[],
            Site:null,
            SiteClient:null,
            posicion:null,
            institucion:null,
            siteSource:[],
            siteClientSource:[],
            posicionSource:[]
        };
    }

    assign(){
        if(!this.disabledBtnAssign){
            this.props.dispatch([
                assignPosition({
                    site:this.state.Site,
                    SiteClient:this.state.SiteClient,
                    position:this.state.posicion,
                    formid:this.props.data,
                    horaPrestacion:this.state.horaPrestacion
                }),
                hiddenModal(this.props.idModal)
            ])
        }
    }

    buscarSite(){
        let form = JSON.parse(localStorage.getItem(this.props.data));
        let data = form.id_institucion;
        Request.get(`http://localhost:4000/api/site/${data.value}/${data.origen}`)
            .then((result)=>{
                //insertamos las prestaciones y los estados seleccionados
                this.setState({
                    horaPrestacion:form.prestacion,
                    prestacion:form.tiposPrestaciones,
                    institucion:form.id_institucion,
                    siteSource:result.data});
            })
            .catch((err)=>{
            });
    }

    cancelar(){
        this.props.dispatch(hiddenModal(this.props.idModal))
    }

    newPosition(){
        this.props.dispatch(addModal({
            body:2,
            data:{
                id:"formPostAsign",
                onEndLoadFormulario:(form)=>{
                    this.props.dispatch(insertTemporalPosicion({
                        idSiteClient:form.id_site_client,
                        label:form.ncr_id,
                        Form:form,
                    }))
                }
            },
            size:"xl"
        }))
    }

    componentDidMount(){

    }

    getSource(){
        this.AutoSite = this.props.AutoComplete.find( obj => obj.id == "idSite");
        this.AutoSiteClient = this.props.AutoComplete.find( obj => obj.id == "idSiteClient");
        this.AutoPosition = this.props.AutoComplete.find( obj => obj.id == "idPosicion");
        let source = {
            sourceSiteClient:[],
            sourcePosicion:[]
        };
        if(!(this.AutoSite && this.AutoSiteClient && this.AutoPosition)) return source;
        source.sourceSiteClient = this.AutoSite.resultSelect ? this.props.source.siteClient[this.AutoSite.resultSelect.value] : [];
        source.sourcePosicion = this.AutoSiteClient.resultSelect ? this.props.source.position[this.AutoSiteClient.resultSelect.value] : [];
        return source;
    }

    render(){
        let props = this.props.store;
        let source = this.props.source;
        /*let autoComp = JSON.parse(localStorage.getItem(this.props.data)).AutoComplete;
        let AutoSource = this.getSource();
        this.disabledBtnPos = true;
        this.disabledBtnAssign = true;
        if(this.AutoSite && this.AutoPosition){
            if(this.AutoSite.indiceSourceSelect != null
                && this.AutoPosition.indiceSourceSelect == null) this.disabledBtnPos = false;
            if(this.AutoSite.indiceSourceSelect != null
                && this.AutoPosition.indiceSourceSelect != null
                && this.state.horaPrestacion.length == this.state.prestacion.length ) this.disabledBtnAssign = false;
        }*/
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
                <Row>
                    <Col xs={12}>
                        <AutoComplete
                            label="Site Client"
                            col={{input:9,label:3}}
                            store={props.siteClient}
                            dataSource={[]}
                            disabled={this.props.request}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertSiteClient(value))
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} >
                        <AutoComplete
                            label="Posicion"
                            col={{input:9,label:3}}
                            dataSource={[]}
                            disabled={this.props.request}
                            store={props.posicion}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertPosicion(value))
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} >
                        {(()=> {
                            if (this.state.prestacion.length == 0) return null;
                            return(
                                <BoxFilter
                                    data={this.state.prestacion}
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
                            <button type="button" disabled={this.props.request} onClick={this.newPosition.bind(this)} className="btn btn-white">
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
