/**
 * Created by mc185249 on 5/9/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../actions/FormSiteClientAction';
import { AutoComplete , Select, Input } from '../componentFormulario/index.js'
import { addModal } from '../../../actions/modalAction'
import { insertPreCarga } from '../../../actions/FormSiteAction';

class FormularioSiteClient extends React.Component{

    formatFormulario(form) {
        return {
            "nombre_site":form.nombreSiteClient,
            "id_tipo_site":form.tipoSiteClient.value,
            "id_geo_cliente":form.geoClient.value,
            "telefono1":form.telefono1,
            "telefono2":form.telefono2,
            "telefono3":form.telefono3,
            "id_inv_site":form.idSite.hasOwnProperty("dataForm") ? null : form.idSite.value,
            "newSite": !form.idSite.hasOwnProperty("dataForm") ? null : form.idSite.dataForm
        }
    }

    validar(form) {
        return (form.nombreSiteClient && form.tipoSiteClient && form.geoClient
        && form.telefono1 && form.telefono2 && form.telefono3 && form.idSite)
    }

    openFormularioSite(){
        //verificamos si newSite esta cargado
        if(this.props.store.newSite){
            this.props.dispatch([
                insertPreCarga(this.props.store.newSite),
                addModal({
                    body:4,
                    data:{
                        onEndLoadFormulario:(form)=>{
                            this.props.dispatch(action.insertNuevoSIte(form))
                        }
                    },
                    size:"xl"
                })
            ])
        }else{
            this.props.dispatch(addModal({
                body:4,
                data:{
                    onEndLoadFormulario:(form)=>{
                        this.props.dispatch(action.insertNuevoSIte(form))
                    }
                },
                size:"xl"
            }))
        }
    }

    render(){
        let props = this.props;
        return(
            <div>
                <form className="form-horizontal">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <Input
                                value={props.store.nombreSiteClient ? props.store.nombreSiteClient: ""}
                                label="Nombre Site"
                                placeHolder="Nombre de Site"
                                returnValue={(value)=>{
                                    props.dispatch(action.insertNameSiteClient(value));
                                }}
                                required={true}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <Select
                                label="Tipo Site"
                                id="idTipoSite"
                                col={{label:2,input:10}}
                                dataSource={props.source.TipoSite}
                                default={props.store.tipoSiteClient ? props.store.tipoSiteClient["value"]:null}
                                required={true}
                                returnSelect={(value)=>{
                                    props.dispatch(action.insertTipoSite(value));
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Geo"
                                store={props.store.geoClient}
                                dataSource={props.source.geoClient}
                                required={true}
                                onChange={(value)=>{
                                    props.dispatch(action.insertGeoClient(value));
                                }}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <Input
                                value={props.store.telefono1 ? props.store.telefono1: ""}
                                label="Telefono 1"
                                placeHolder="Numero de Telefono"
                                returnValue={(value)=>{
                                    props.dispatch(action.insertPhone1(value));
                                }}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <Input
                                value={props.store.telefono2 ? props.store.telefono2: ""}
                                label="Telefono 2"
                                placeHolder="Numero de Telefono"
                                returnValue={(value)=>{
                                    props.dispatch(action.insertPhone2(value));
                                }}
                                required={true}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <Input
                                value={props.store.telefono3 ? props.store.telefono3: ""}
                                label="Telefono 3"
                                placeHolder="Numero de Telefono"
                                returnValue={(value)=>{
                                    props.dispatch(action.insertPhone3(value));
                                }}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Cliente"
                                store={props.store.institucion}
                                dataSource={props.institucion}
                                required={true}
                                onChange={(value)=>{
                                    props.dispatch(action.insertInstitucion(value));
                                }}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Site"
                                store={props.store.idSite}
                                dataSource={props.store.sourceSite}
                                required={true}
                                onChange={(value)=>{
                                    props.dispatch(action.insertIdSite(value));
                                }}
                                disabled={(props.store.newSite != null || props.request)}
                            />
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-6 text-center">
                                <button className="btn btn-white separarButton"
                                        type="button"
                                        disabled={(props.store.newSite != null || props.request)}
                                        onClick={()=>{this.openFormularioSite()}}>
                                    Crear nuevo Site
                                </button>
                            </div>
                            <div className="col-xs-12 col-md-6 text-center">
                                {(()=>{
                                    if(props.store.newSite){
                                        return (
                                            <div>
                                                <strong>Nuevo Site :</strong> {props.store.newSite.nombreSite}
                                                <button type="button"
                                                        style={{marginLeft:"20px"}}
                                                        onClick={()=>{this.openFormularioSite()}}
                                                        className="btn btn-white btn-xs separarButton">
                                                    <i className={`fa fa-pencil`}/>
                                                </button>
                                                <button type="button" className="btn btn-white btn-xs separarButton"
                                                    onClick={()=>{props.dispatch(action.insertNuevoSIte(null))}}>
                                                    <i className={`fa fa-trash`}/>
                                                </button>
                                            </div>
                                        )
                                    }
                                    else{
                                        return null;
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                </form>
                <div className="hr-line-dashed"/>
                <div className="row text-center">
                    <button className="btn btn-white separarButton"
                            disabled={props.request}
                            onClick={()=>{
                                if(!this.validar(props.store)) return;
                                props.onEndLoadForm(this.formatFormulario(props.store));
                            }}>
                        Agregar Site cliente
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        store:state.siteClient,
        source:state.source,
        institucion:state.app.instituciones,
        request:state.app.Request
    }
};

export default connect(mapStateToProps)(FormularioSiteClient)
