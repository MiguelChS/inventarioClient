import React from 'react';
import { connect } from  'react-redux';
import { AutoComplete , Select, Input,InputHorario } from '../../componentFormulario/index.js'
import { addFormPos,insertClient,insertNCR,insertIP,insertSite,insertGaveta,
    insertTableStatus,insertScript,insertCommand,insertCommunityString,
insertComunicacion,insertSLM,insertFLM,insertPRESTACION,insertUbicacion,
insertHourBranch} from '../../../../actions/formPositionAction';

@connect((store)=>{
    return {
        fomPos:store.formPosition,
        source:store.source
    }
})

export default class Formulario extends React.Component{

    componentDidMount(){
        if(!this.store){
            this.props.dispatch(addFormPos({id:this.props.id}))
        }
    }

    render(){
        this.store = this.props.fomPos.find(obj => obj.id == this.props.id);
        if(!this.store) return null;
        return (
            <form className="form-horizontal">
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Input
                            value={this.store.cliente ? this.store.cliente: ""}
                            label="Cliente"
                            placeHolder="name Cliente"
                            returnValue={(value)=>{
                                this.props.dispatch(insertClient({id:this.store.id,text:value}));
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Input
                            value={this.store.ncr ? this.store.ncr: ""}
                            label="NCR"
                            placeHolder="NCR"
                            returnValue={(value)=>{
                                this.props.dispatch(insertNCR({id:this.store.id,text:value}));
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Input
                            value={this.store.ip ? this.store.ip: ""}
                            label="IP"
                            placeHolder="IP"
                            returnValue={(value)=>{
                                this.props.dispatch(insertIP({id:this.store.id,text:value}));
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Site"
                                      id="idSite"
                                      dataSource={this.props.source.site}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(insertSite({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Gaveta"
                                      id="idGaveta"
                                      dataSource={this.props.source.gavetas}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(insertGaveta({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Status"
                                      id="idTableStatus"
                                      dataSource={this.props.source.tablaStatus}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(insertTableStatus({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Script"
                                      id="idScript"
                                      dataSource={this.props.source.callingScript}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(insertScript({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Command"
                                      id="idCommand"
                                      col={{label:3,input:9}}
                                      dataSource={this.props.source.commandScript}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(insertCommand({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Community"
                                      id="idCommunity"
                                      col={{label:3,input:9}}
                                      dataSource={this.props.source.community}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(insertCommunityString({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="comunicacion"
                                      id="idComunicacion"
                                      col={{label:3,input:9}}
                                      dataSource={this.props.source.comunicacion}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(insertComunicacion({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="SLM"
                                      id="idSLM"
                                      dataSource={this.props.source.slm}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(insertSLM({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="FLM"
                                      id="idFLM"
                                      dataSource={this.props.source.flm}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(insertFLM({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Prestacion"
                                      id="idPrestacion"
                                      col={{label:3,input:9}}
                                      dataSource={this.props.source.prestacion}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(insertPRESTACION({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Select
                            label="Ubicacion"
                            id="idUbicacion"
                            col={{label:3,input:9}}
                            dataSource={this.props.source.ubicacionSite}
                            default={this.store.ubicacion_en_site ? this.store.ubicacion_en_site["value"]:null}
                            required={true}
                            returnSelect={(value)=>{
                                this.props.dispatch(insertUbicacion({id:this.store.id,value:value}));
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <InputHorario
                            label="Branch Hours"
                            col={{label:4,input:8}}
                            data={{
                                id:"horaBranch",
                                radioConf:[
                                    {label:"Branch Hour",color:"red",id:2},
                                    {label:"After Hour",color:"blue",id:1},
                                    {label:"Other Hour",color:"green",id:4}
                                ],
                                hour24:true,
                                callbackResult:(value)=>{
                                    this.props.dispatch(insertHourBranch({id:this.store.id,value:value}));
                                },
                                firstDefault:this.store.hourBranch
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <InputHorario
                            label="SLA"
                            data={{
                                id:"horaSLA",
                                radioConf:[
                                    {label:"SLA",color:"red",id:7}
                                ],
                                hour24:false,
                                callbackResult:(value)=>{ console.log(`${value} --- ${this.store.id}`)}
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <InputHorario
                            label="Acceso"
                            data={{
                                id:"horaAcceso",
                                radioConf:[
                                    {label:"Acceso",color:"green",id:8}
                                ],
                                hour24:false,
                                callbackResult:(value)=>{
                                    console.log(`${value} --- ${this.store.id}`)
                                }
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <InputHorario
                            label="Hour Peak"
                            col={{label:3,input:9}}
                            data={{
                                id:"horaPeak",
                                radioConf:[
                                    {label:"Peak Hour",color:"green",id:5},
                                    {label:"OffPeak Hour",color:"green",id:6}
                                ],
                                hour24:true,
                                callbackResult:(value)=>{ console.log(`${value} --- ${this.store.id}`)}
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <InputHorario
                            label="Hour Operation"
                            col={{label:4,input:8}}
                            data={{
                                id:"horaOperation",
                                radioConf:[
                                    {label:"Operation",color:"green",id:3}
                                ],
                                hour24:false,
                                callbackResult:(value)=>{ console.log(`${value} --- ${this.store.id}`)}
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="hr-line-dashed"/>
                </div>
                <div className="row">
                    <div className="text-center col-xs-12">
                        <button type="button" className="btn btn-white">
                            Agregar Posicion
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}