import React from 'react';
import { connect } from  'react-redux';
import { AutoComplete , Select, Input,InputHorario } from '../../componentFormulario/index.js'
import BoxFilter from '../../../boxFilter/index.jsx';
import  * as action from '../../../../actions/formPositionAction';

@connect((store)=>{
    return {
        fomPos:store.formPosition,
        source:store.source,
        cliente:store.app.cliente,
        request:store.app.Request
    }
})

export default class Formulario extends React.Component{

    endLoad(){
        if(!this.validar()) return;
        let formAux = this.store;
        this.props.onEnLoad(formAux);
    }

    validar(){
        let form = this.store;
        if(this.props.hasOwnProperty("desdeEquipo")){
            return (form.nombrePoscion && form.ncr && form.config_gavetas && form.tabla_status && form.script &&
            form.command && form.community_string && form.ip && form.comunicacion && form.slm && form.flm && form.ubicacion_en_site &&
            form.hourBranch && form.hourOperation && form.sla && form.access && form.hourPeak);
        }else{
            //verificamos si todas la hora prestacion estar cargadas
            let flagComplete = true;
            form.hourPrestacion.map( obj => {
                if(!obj.hasOwnProperty("hora")){
                    flagComplete = false;
                }
            });
            return (form.nombrePoscion && form.ncr && form.site && form.config_gavetas && form.tabla_status && form.script &&
            form.command && form.community_string && form.ip && form.comunicacion && form.slm && form.flm && form.ubicacion_en_site  &&
            form.hourBranch && form.hourOperation && form.sla && form.access && form.hourPeak  && flagComplete
            );
            //&& form.id_Equipo && !form.mjsErr
        }
    }

    componentWillUnmount(){
        this.props.dispatch(action.clearForm());
    }

    componentDidMount(){
        if(this.props.hasOwnProperty("Default")){
            this.props.dispatch(action.preLoadFormulario(this.props.Default))
        }
    }

    render(){
        this.store = this.props.fomPos;
        return (
            <form className="form-horizontal" onSubmit={(event)=>{
                event.preventDefault();
            }}>
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <p className="mjsErr">{this.store.mjsErr}</p>
                        <p className="mjsSuccess">{this.store.mjsSuccess}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <Input
                            value={this.store.nombrePoscion}
                            label="Nombre posicion"
                            placeHolder="Nombre posicion"
                            required={true}
                            returnValue={(value)=>{
                                this.props.dispatch(action.insertNombrePosicion(value));
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
                            label="Cliente"
                            dataSource={this.props.cliente}
                            required={true}
                            store={this.store.cliente}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertCliente(value));
                            }}
                            disabled={(this.props.request)}
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
                            label="Status"
                            store={this.store.tabla_status}
                            dataSource={this.props.source.tablaStatus}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertTableStatus(value));
                            }}
                        />
                    </div>
                </div>

                <div className="row">
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
                </div>

                <div className="row">
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
                </div>

                <div className="row">
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
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <Select
                            label="Ubicacion"
                            id="idUbicacion"
                            col={{label:2,input:10}}
                            dataSource={this.props.source.ubicacionSite}
                            default={this.store.ubicacion_en_site}
                            required={true}
                            returnSelect={(value)=>{
                                this.props.dispatch(action.insertUbicacion(value));
                            }}
                        />
                    </div>
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
                </div>

                <div className="row">
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
                                    this.props.dispatch(action.insertHourSLA(value));
                                },
                                firstDefault:this.store.sla
                            }}
                        />
                    </div>
                </div>

                <div className="row">
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
                                    this.props.dispatch(action.insertHourAccess(value));
                                },
                                firstDefault:this.store.access
                            }}
                        />
                    </div>
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
                                    this.props.dispatch(action.insertHourPeak(value));
                                },
                                firstDefault:this.store.hourPeak
                            }}
                        />
                    </div>
                </div>

                <div className="row">
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
                                    this.props.dispatch(action.insertHourOperation(value));
                                },
                                firstDefault:this.store.hourOperation
                            }}
                        />
                    </div>
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
                                    this.props.dispatch(action.insertHourBranch(value));
                                },
                                firstDefault:this.store.hourBranch
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    {(()=>{
                        if(this.store.hourPrestacion.length > 0){
                            return <BoxFilter
                                data={this.store.hourPrestacion}
                                result={(value)=>{
                                    this.props.dispatch(action.insertHourPrestacion(value))
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
                                disabled={this.props.request}
                        >
                            Agregar Posicion
                        </button>
                        {(()=>{
                            if(!this.props.hasOwnProperty("onCancel")) return null;
                            return(
                                <button
                                    type="button"
                                    disabled={this.props.request}
                                    className="btn btn-white separarButton"
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

/*<div className="col-xs-12 col-md-6">
 {(()=>{
 if(this.props.hasOwnProperty("desdeEquipo")) return null;
 return (
 <AutoComplete
 label="Equipo"
 col={{label:2,input:10}}
 dataSource={this.store.sourceEquipo}
 store={this.store.id_Equipo}
 required={true}
 onChange={(value)=>{
 this.props.dispatch(action.insertEquipo(value,this.props.source.TypeHora));
 }}
 disabled={this.props.request}
 />
 )
 })()}
 </div>*/