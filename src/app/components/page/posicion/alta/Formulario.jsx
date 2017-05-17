import React from 'react';
import { connect } from  'react-redux';
import { AutoComplete , Select, Input,InputHorario } from '../../componentFormulario/index.js'
import BoxFilter from '../../../boxFilter/index.jsx';
import  * as action from '../../../../actions/formPositionAction';
import {noSelect} from '../../../../actions/autoCompleteAction';

@connect((store)=>{
    return {
        fomPos:store.formPosition,
        source:store.source,
        institucion:store.app.instituciones,
        request:store.app.Request
    }
})

export default class Formulario extends React.Component{

    formatHour(hora){
        let newHora = [];
        for(let attr in hora){
            if(hora.hasOwnProperty(attr)){
                newHora.push({
                    idHora:attr,
                    hora:hora[attr]
                })
            }
        }
        return newHora;
    }

    endLoad(){
        if(!this.validar()) return;
        let formAux = this.store;
        let form = {
            "client_id":formAux.cliente,
            "ncr_id": formAux.ncr,
            "id_site_client":formAux.siteClient.value,
            "id_config_gavetas":formAux.config_gavetas.value,
            "id_tabla_status":formAux.tabla_status.value,
            "id_script": formAux.script.value,
            "id_command":formAux.command.value,
            "id_community_string":formAux.community_string.value,
            "ip":formAux.ip,
            "id_comunicacion":formAux.comunicacion.value,
            "id_slm":formAux.slm.value,
            "id_flm":formAux.flm.value,
            "id_prestacion":1,
            "id_ubicacion_en_site":formAux.ubicacion_en_site.value,
            "hourBranch":this.formatHour(formAux.hourBranch),
            "hourOperation":this.formatHour(formAux.hourOperation),
            "sla":this.formatHour(formAux.sla),
            "access":this.formatHour(formAux.access),
            "hourPeak":this.formatHour(formAux.hourPeak),
            "HoraPrestacion":formAux.hourPrestacion,
            "idEquipo":formAux.id_Equipo ? formAux.id_Equipo.value : null,
            "dato2":null,
            "dato3":null,
        };
        this.props.onEnLoad(form);
    }

    validar(){
        let form = this.store;
        if(this.props.hasOwnProperty("sinPrestacion")){
            return (form.cliente && form.ncr && form.siteClient && form.config_gavetas && form.tabla_status && form.script &&
            form.command && form.community_string && form.ip && form.comunicacion && form.slm && form.flm && form.ubicacion_en_site &&
            form.hourBranch && form.hourOperation && form.sla && form.access && form.hourPeak);
        }else{
            return (form.cliente && form.ncr && form.siteClient && form.config_gavetas && form.tabla_status && form.script &&
            form.command && form.community_string && form.ip && form.comunicacion && form.slm && form.flm && form.ubicacion_en_site && form.id_Equipo &&
            form.hourBranch && form.hourOperation && form.sla && form.access && form.hourPeak &&
            (form.hourPrestacion.length == form.idPrestaciones.length) && !form.mjsErr);
        }
    }

    render(){
        this.store = this.props.fomPos;
        //vericamos si viene las prestacion por las propiedades
        let prestacion;
        if(!this.props.hasOwnProperty("sinPrestacion")){
            prestacion = this.store.idPrestaciones.map((id)=>{
                return this.props.source.TypeHora.find(x => x.value == id.idVentanaHoraria);
            });
        }
        return (
            <form className="form-horizontal">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <p className="mjsErr">{this.store.mjsErr}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <Input
                            value={this.store.cliente ? this.store.cliente: ""}
                            label="Cliente"
                            placeHolder="name Cliente"
                            required={true}
                            returnValue={(value)=>{
                                this.props.dispatch(action.insertClient(value));
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <Input
                            value={this.store.ncr ? this.store.ncr: ""}
                            label="NCR"
                            placeHolder="NCR"
                            required={true}
                            returnValue={(value)=>{
                                this.props.dispatch(action.insertNCR(value));
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <Input
                            value={this.store.ip ? this.store.ip: ""}
                            label="IP"
                            placeHolder="IP"
                            required={true}
                            returnValue={(value)=>{
                                this.props.dispatch(action.insertIP(value));
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Institucion"
                            dataSource={this.props.institucion}
                            required={true}
                            store={this.store.institucion}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertInstitucion(value));
                            }}
                            disabled={this.props.request}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Site"
                            dataSource={this.store.sourceSite}
                            required={true}
                            disabled={this.props.request}
                            store={this.store.site}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertSite(value));
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Site Client"
                            store={this.store.siteClient}
                            dataSource={this.store.sourceClient}
                            required={true}
                            disabled={this.props.request}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertSiteClient(value));
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Status"
                            store={this.store.tabla_status}
                            dataSource={this.props.source.tablaStatus}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertTableStatus(value));
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Script"
                            store={this.store.script}
                            dataSource={this.props.source.callingScript}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertScript(value));
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Command"
                            col={{label:2,input:10}}
                            store={this.store.command}
                            dataSource={this.props.source.commandScript}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertCommand(value));
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Community"
                            col={{label:2,input:10}}
                            dataSource={this.props.source.community}
                            store={this.store.community_string}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertCommunityString(value));
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="comunicacion"
                            col={{label:2,input:10}}
                            dataSource={this.props.source.comunicacion}
                            store={this.store.comunicacion}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertComunicacion(value));
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="SLM"
                            store={this.store.slm}
                            dataSource={this.props.source.slm}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertSLM(value));
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="FLM"
                            dataSource={this.props.source.flm}
                            store={this.store.flm}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertFLM(value));
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <Select
                            label="Ubicacion"
                            id="idUbicacion"
                            col={{label:2,input:10}}
                            dataSource={this.props.source.ubicacionSite}
                            default={this.store.ubicacion_en_site ? this.store.ubicacion_en_site["value"]:null}
                            required={true}
                            returnSelect={(value)=>{
                                this.props.dispatch(action.insertUbicacion(value));
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Prestacion"
                            col={{label:2,input:10}}
                            dataSource={this.props.source.prestacion}
                            store={this.store.prestacion}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertPRESTACION(value));
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Gaveta"
                            store={this.store.config_gavetas}
                            dataSource={this.props.source.gavetas}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertGaveta(value));
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <InputHorario
                            label="SLA"
                            required={true}
                            data={{
                                id:"horaSLA",
                                radioConf:[
                                    {label:"SLA",color:"red",id:7}
                                ],
                                hour24:false,
                                callbackResult:(value)=>{
                                    this.props.dispatch(action.insertHourSLA({id:this.store.id,value:value}));
                                },
                                firstDefault:this.store.sla
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <InputHorario
                            label="Acceso"
                            required={true}
                            data={{
                                id:"horaAcceso",
                                radioConf:[
                                    {label:"Acceso",color:"green",id:8}
                                ],
                                hour24:false,
                                callbackResult:(value)=>{
                                    this.props.dispatch(action.insertHourAccess({id:this.store.id,value:value}));
                                },
                                firstDefault:this.store.access
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <InputHorario
                            label="Hour Peak"
                            required={true}
                            col={{label:2,input:10}}
                            data={{
                                id:"horaPeak",
                                radioConf:[
                                    {label:"Peak Hour",color:"green",id:5},
                                    {label:"OffPeak Hour",color:"blue",id:6}
                                ],
                                hour24:true,
                                callbackResult:(value)=>{
                                    this.props.dispatch(action.insertHourPeak({id:this.store.id,value:value}));
                                },
                                firstDefault:this.store.hourPeak
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <InputHorario
                            label="Hour Operation"
                            required={true}
                            col={{label:2,input:10}}
                            data={{
                                id:"horaOperation",
                                radioConf:[
                                    {label:"Operation",color:"green",id:3}
                                ],
                                hour24:false,
                                callbackResult:(value)=>{
                                    this.props.dispatch(action.insertHourOperation({id:this.store.id,value:value}));
                                },
                                firstDefault:this.store.hourOperation
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <InputHorario
                            label="Branch Hours"
                            col={{label:2,input:10}}
                            required={true}
                            data={{
                                id:"horaBranch",
                                radioConf:[
                                    {label:"Branch Hour",color:"red",id:2},
                                    {label:"After Hour",color:"blue",id:1},
                                    {label:"Other Hour",color:"green",id:4}
                                ],
                                hour24:true,
                                callbackResult:(value)=>{
                                    this.props.dispatch(action.insertHourBranch({id:this.store.id,value:value}));
                                },
                                firstDefault:this.store.hourBranch
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        {(()=>{
                            if(this.props.hasOwnProperty("sinPrestacion")) return null;
                            return (
                                <AutoComplete
                                    label="Equipo"
                                    col={{label:2,input:10}}
                                    dataSource={this.store.sourceEquipo}
                                    store={this.store.id_Equipo}
                                    required={true}
                                    onChange={(value)=>{
                                        this.props.dispatch(action.insertEquipo(value));
                                    }}
                                    disabled={this.props.request}
                                />
                            )
                        })()}
                    </div>
                </div>

                <div className="row">
                    {(()=>{
                        if(prestacion.length > 0){
                            return <BoxFilter
                                data={prestacion}
                                result={(value)=>{
                                    this.props.dispatch(action.insertHourPrestacion(value,this.store))
                                }}
                            />
                        }else{
                            return null;
                        }
                    })()}
                </div>

                <div className="hr-line-dashed"/>
                <div className="row">
                    <div className="text-center col-xs-12">
                        <button type="button"
                                className="btn btn-white separarButton"
                                onClick={this.endLoad.bind(this)}
                                disabled={this.store.stateRequtes}
                        >
                            Agregar Posicion
                        </button>
                        {(()=>{
                            if(!this.props.hasOwnProperty("onCancel")) return null;
                            return(
                                <button className="btn btn-white separarButton"
                                        onClick={()=>{
                                            this.props.onCancel();
                                        }}>
                                    Cancelar
                                </button>
                            )
                        })()}
                    </div>
                </div>
            </form>
        )
    }
}