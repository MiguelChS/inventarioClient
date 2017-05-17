/**
 * Created by mc185249 on 5/9/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../../actions/FormSiteAction';
import {hiddenModal} from '../../../actions/modalAction'
import { AutoComplete , Select, Input } from '../componentFormulario/index.js'

let FormularioSite = (props)=>{
    return(
        <form className="form-horizontal">
            <h4 className="titleModal">Alta Site</h4>
            <div className="hr-line-dashed"/>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.nombreSite ? props.store.nombreSite: ""}
                        label="Nombre Site"
                        placeHolder="Nombre de Site"
                        returnValue={(value)=>{
                            props.dispatch(action.insertNameSite(value));
                        }}
                        required={true}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.direccion ? props.store.direccion: ""}
                        label="Direccion"
                        placeHolder="Direccion"
                        returnValue={(value)=>{
                            props.dispatch(action.insertDireccion(value));
                        }}
                        required={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Select
                        label="Tipo Direccion"
                        id="idTipoDireccion"
                        col={{label:2,input:10}}
                        dataSource={props.source.TipoDireccion}
                        default={props.store.idTipoDireccion ? props.store.idTipoDireccion["value"]:null}
                        required={true}
                        returnSelect={(value)=>{
                            props.dispatch(action.insertTypeDireccion(value));
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.siteCode ? props.store.siteCode: ""}
                        label="SiteCode"
                        placeHolder="SiteCode"
                        returnValue={(value)=>{
                            props.dispatch(action.insertSiteCode(value));
                        }}
                        required={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.kmNcr ? props.store.kmNcr: ""}
                        label="Km NCR"
                        placeHolder="km NCR"
                        returnValue={(value)=>{
                            props.dispatch(action.insertKmNcr(value));
                        }}
                        required={true}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.offset ? props.store.offset: ""}
                        label="offSet"
                        placeHolder="offSet"
                        returnValue={(value)=>{
                            props.dispatch(action.insertOffSet(value));
                        }}
                        required={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.telefonoSite ? props.store.telefonoSite: ""}
                        label="Telefono"
                        placeHolder="Telefono"
                        returnValue={(value)=>{
                            props.dispatch(action.insertPhoneSite(value));
                        }}
                        required={true}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <Input
                        dual={{inputOne:props.store.latitud ? props.store.latitud: "",
                            inputTwo:props.store.longitud ? props.store.longitud: ""}}
                        label="cordenadas"
                        placeHolder={{inputOne:"Latitud",inputTwo:"Longitud"}}
                        onChangeInputOne={(value)=>{
                            props.dispatch(action.insertLatitud(value));
                        }}
                        onChangeInputTwo={(value)=>{
                            props.dispatch(action.insertLongitud(value));
                        }}
                        required={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Geo Ncr"
                        dataSource={props.source.geoNCR}
                        store={props.store.geoNcr}
                        required={true}
                        onChange={(value)=>{
                            props.dispatch(action.insertGeoNcr(value));
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Pais"
                        dataSource={props.source.pais}
                        store={props.store.pais}
                        required={true}
                        onChange={(value)=>{
                            props.dispatch(action.insertPais(value));
                        }}
                        disabled={props.request}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Estado"
                        dataSource={props.store.sourceEstado}
                        store={props.store.estado}
                        required={true}
                        onChange={(value)=>{
                            props.dispatch(action.insertEstado(value,props.store.pais.value));
                        }}
                        disabled={props.request}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Ciudad"
                        dataSource={props.store.sourceCiudad}
                        store={props.store.ciudad}
                        required={true}
                        onChange={(value)=>{
                            props.dispatch(action.insertCiudad(value,props.store.pais.value,props.store.estado.value));
                        }}
                        disabled={props.request}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Codigo Postal"
                        dataSource={props.store.sourceCodigoPostal}
                        store={props.store.geo}
                        required={true}
                        onChange={(value)=>{
                            props.dispatch(action.insertGeo(value));
                        }}
                        disabled={props.request}
                    />
                </div>
                <div className="col-xs-12 col-md-6"/>
            </div>

            <div className="row text-center">
                <div className="btn-group separarButton">
                    <button
                        type="button"
                        disabled={props.request}
                        onClick={()=>{
                            if(!validar(props.store)) return;
                            props.data.onEndLoadFormulario(props.store);
                            props.dispatch([
                                hiddenModal(props.idModal),
                                action.clearForm()
                            ]);
                        }}
                        className="btn btn-white">
                        Nuevo Site
                    </button>
                </div>
                <div className="btn-group separarButton">
                    <button type="button"
                            disabled={props.request}
                            onClick={()=>{
                                props.dispatch([
                                    hiddenModal(props.idModal),
                                    action.clearForm()
                                ]);
                            }}
                            className="btn btn-white">
                        Cancelar
                    </button>
                </div>
            </div>

        </form>
    )
};


function formatFormulario(form) {
    return {
        "nombre_site_id":form.nombreSite,
        "direccion":form.direccion,
        "telefono":form.telefonoSite,
        "site_code":form.siteCode,
        "id_geo":form.geo.value,
        "id_geo_ncr":form.geoNcr.value,
        "km_ncr":form.kmNcr,
        "latitud":form.latitud,
        "longitud":form.longitud,
        "offset":form.offset,
        "id_tipo_direccion":form.idTipoDireccion.value
    }
}

function validar(form) {
    return (form.nombreSite && form.direccion && form.telefonoSite && form.siteCode && form.geo &&
    form.geoNcr && form.kmNcr && form.latitud && form.longitud && form.offset && form.idTipoDireccion);

}

const mapStateToProps = (state)=>{
    return {
        store:state.site,
        source:state.source,
        request:state.app.Request
    }
};

export default connect(mapStateToProps)(FormularioSite);