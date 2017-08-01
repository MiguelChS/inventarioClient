/**
 * Created by mc185249 on 5/9/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../../../actions/FormSiteAction';
import {hiddenModal} from '../../../../actions/modalActionV2'
import { AutoComplete , Input,Label } from '../../componentFormulario/index.js'

function Direccion(props) {
    if(props.store.SitePublic && props.store.SitePublic.value){
        let data = props.store.SitePublic;
        return(
            <Label
                label="Direccion"
                value={data.Direccion}
            />
        )
    }else{
        return(
            <Input
                value={props.store.direccion ? props.store.direccion: ""}
                label="Direccion"
                placeHolder="Direccion"
                returnValue={(value)=>{
                    props.dispatch({
                        type: "INSERT_DIRECCION_SITE",
                        value: value
                    });
                }}
                required={true}
            />
        )
    }
}

function offSet(props) {
    if(props.store.SitePublic && props.store.SitePublic.value){
        let data = props.store.SitePublic;
        return(
            <Label
                label="OffSet"
                value={data.offset}
            />
        )
    }else{
        return(
            <Input
                value={props.store.offset}
                label="offSet"
                placeHolder="offSet"
                returnValue={(value)=>{
                    props.dispatch({
                        type: "INSERT_OFFSET_SITE",
                        value: value
                    });
                }}
                required={true}
            />
        )
    }
}

function LatLong(props) {
    if(props.store.SitePublic && props.store.SitePublic.value){
        let data = props.store.SitePublic;
        return(
            <Label
                label="Cordenadas"
                value={`lat:${data.latitud ? data.latitud : ""} - long:${data.longitud ? data.longitud : ""}`}
            />
        )
    }else{
        return(
            <Input
                dual={{inputOne:props.store.latitud ? props.store.latitud: "",
                    inputTwo:props.store.longitud ? props.store.longitud: ""}}
                label="cordenadas"
                placeHolder={{inputOne:"Latitud",inputTwo:"Longitud"}}
                onChangeInputOne={(value)=>{
                    props.dispatch({
                        type: "INSERT_LATITUD_SITE",
                        value: value
                    });
                }}
                onChangeInputTwo={(value)=>{
                    props.dispatch({
                        type: "INSERT_LONGITUD_SITE",
                        value: value
                    });
                }}
                required={true}
            />
        )
    }

}

function pais(props) {
    if(props.store.SitePublic && props.store.SitePublic.value){
        let data = props.store.SitePublic;
        return(
            <Label
                label="Pais"
                value={data.pais}
            />
        )
    }else{
        return(
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
        )
    }
}

function estado(props) {
    if(props.store.SitePublic && props.store.SitePublic.value){
        let data = props.store.SitePublic;
        return(
            <Label
                label="Estado"
                value={data.estado}
            />
        )
    }else{
        return(
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
        )
    }
}

function ciudad(props) {
    if(props.store.SitePublic && props.store.SitePublic.value){
        let data = props.store.SitePublic;
        return(
            <Label
                label="Ciudad"
                value={data.ciudad}
            />
        )
    }else{
        return(
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
        )
    }
}

function codigoPostal(props) {
    if(props.store.SitePublic && props.store.SitePublic.value){
        let data = props.store.SitePublic;
        return(
            <Label
                label="Codigo Postal"
                value={data.codigo_postal}
            />
        )
    }else{
        return(
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
        )
    }
}

function componentModal(props, component) {
    if (!props.hasOwnProperty("idModal")) return null;
    return component;
}

let FormularioSite = (props)=>{
    if (!props.store.Lugar || (props.store.Lugar.value !== 1 && (!props.store.SitePublic || !props.store.SitePublic.value))) return null;
    return(
        <form className="form-horizontal">
            <div className="row">
                <div className="col-xs-12 text-center">
                    <p className="mjsSuccess">{props.store.mjsSuccess}</p>
                    <p className="mjsErr">{props.store.msjErr}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.nombreSite ? props.store.nombreSite: ""}
                        label="Nombre Site"
                        placeHolder="Nombre de Site"
                        returnValue={(value)=>{
                            props.dispatch({
                                type: "INSERT_NAME_SITE_SITE",
                                value: value
                            })
                        }}
                        required={true}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    {Direccion(props)}
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Cliente"
                        dataSource={props.cliente}
                        store={props.store.idClient}
                        required={true}
                        onChange={(value)=>{
                            props.dispatch({
                                type: "INSERT_CLIENT_SITE",
                                value: value
                            });
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    {offSet(props)}
                </div>
                <div className="col-xs-12 col-md-6">
                    <AutoComplete
                        label="Geo Cliente"
                        dataSource={props.source.geoClient}
                        store={props.store.geoClient}
                        required={true}
                        onChange={(value)=>{
                            props.dispatch({
                                type: "INSERT_GEO_CLIENT_SITE",
                                value: value
                            });
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    {LatLong(props)}
                </div>
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.telefono1}
                        label="Telefono1"
                        placeHolder="Numero telefono"
                        returnValue={(value)=>{
                            props.dispatch({
                                type: "INSERT_PHONE1_SITE",
                                value: value
                            });
                        }}
                        required={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.telefono2}
                        label="Telefono2"
                        placeHolder="Numero telefono"
                        returnValue={(value)=>{
                            props.dispatch({
                                type: "INSERT_PHONE2_SITE",
                                value: value
                            });
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.telefono3}
                        label="Telefono3"
                        placeHolder="Numero telefono"
                        returnValue={(value)=>{
                            props.dispatch({
                                type: "INSERT_PHONE3_SITE",
                                value: value
                            });
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    {pais(props)}
                </div>
                <div className="col-xs-12 col-md-6">
                    {estado(props)}
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    {ciudad(props)}
                </div>
                <div className="col-xs-12 col-md-6">
                    {codigoPostal(props)}
                </div>
            </div>
            <div className="hr-line-dashed"/>
            <div className="row">
                <div className="col-xs-12 text-center">
                    <button
                        type="button"
                        disabled={props.request}
                        onClick={()=>{
                            if(!validar(props.store)) return;
                            props.onLoadFormulario(props.store, props.idModal);
                        }}
                        className="btn btn-white separarButton">
                        {props.btnAcepted}
                    </button>
                    {componentModal(props,
                        <button
                            type="button"
                            disabled={props.request}
                            onClick={() => {
                                props.dispatch([
                                    hiddenModal(props.idModal),
                                    action.clearForm()
                                ])
                            }}
                            className="btn btn-white separarButton">
                            Cerrar
                        </button>
                    )}
                </div>
            </div>

        </form>
    )
};

function validar(form) {
    if(form.SitePublic){
        return (form.nombreSite &&
            form.idClient && form.idClient.value &&
            form.geoClient && form.geoClient.value &&
            form.telefono1);
    }else{
        return (form.nombreSite && form.direccion &&
            form.geo && form.geo.value &&
            form.geoClient && form.geoClient.value &&
            form.idClient && form.idClient.value &&
            form.latitud && form.longitud && form.offset && form.telefono1);
    }
}

const mapStateToProps = (state)=>{
    return {
        store:state.site,
        source:state.source,
        request:state.app.Request,
        cliente:state.app.cliente
    }
};

export default connect(mapStateToProps)(FormularioSite);