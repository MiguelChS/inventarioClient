import React from 'react';
import { connect } from  'react-redux';
import { AutoComplete , Select, Input,InputHorario } from '../../componentFormulario/index.js'
import { addFormPos,insertClient } from '../../../../actions/formPositionAction';
import { addAuto } from '../../../../actions/autoCompleteAction';

@connect((store)=>{
    return {
        form: store.formPosition.find(obj => obj.id == "FormPosicionAlta"),
        ncrAuto: store.AutoComplete.find(obj => obj.id == "autoNcr"),
        SiteAuto: store.AutoComplete.find(obj => obj.id == "autoSite"),
        source:store.source
    }
})

export default class Formulario extends React.Component{

    componentDidMount(){
        if (!this.props.form && !this.props.ncrAuto){
            this.props.dispatch([
                addAuto({id:"autoNcr"}),
                addAuto({id:"autoSite"}),
                addFormPos({id:"FormPosicionAlta"})
            ])
        }
    }

    render(){
        if (!this.props.form && !this.props.ncrAuto) return null;
        let store = this.props.form;
        return (
            <form className="form-horizontal">
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Input
                            value={store.cliente ? store.cliente: ""}
                            label="Cliente"
                            placeHolder="name Cliente"
                            returnValue={(value)=>{
                                this.props.dispatch(insertClient({id:store.id,text:value}));
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="ncr"
                                      id="ncr_id"
                                      dataSource={[{label:"miguel",value:45},{label:"nancy",value:25}]}
                                      Store={this.props.ncrAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Site"
                                      id="idSite"
                                      dataSource={this.props.source.site}
                                      Store={this.props.SiteAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Gaveta"
                                      id="idGaveta"
                                      dataSource={this.props.source.gavetas}
                                      Store={this.props.SiteAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Status"
                                      id="idTableStatus"
                                      dataSource={this.props.source.tablaStatus}
                                      Store={this.props.SiteAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Script"
                                      id="idScript"
                                      dataSource={this.props.source.callingScript}
                                      Store={this.props.SiteAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Command"
                                      id="idCommand"
                                      col={{label:3,input:9}}
                                      dataSource={this.props.source.commandScript}
                                      Store={this.props.SiteAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Community"
                                      id="idCommunity"
                                      col={{label:3,input:9}}
                                      dataSource={this.props.source.community}
                                      Store={this.props.SiteAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Input
                            value={store.cliente ? store.cliente: ""}
                            label="IP"
                            placeHolder="IP"
                            returnValue={(value)=>{
                                this.props.dispatch(insertClient({id:store.id,text:value}));
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="comunicacion"
                                      id="idComunicacion"
                                      col={{label:3,input:9}}
                                      dataSource={this.props.source.comunicacion}
                                      Store={this.props.SiteAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="SLM"
                                      id="idSLM"
                                      dataSource={this.props.source.slm}
                                      Store={this.props.SiteAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="FLM"
                                      id="idFLM"
                                      dataSource={this.props.source.flm}
                                      Store={this.props.SiteAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Prestacion"
                                      id="idPrestacion"
                                      col={{label:3,input:9}}
                                      dataSource={this.props.source.prestacion}
                                      Store={this.props.SiteAuto}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          console.log(value);
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Select
                            label="Ubicacion"
                            id="idUbicacion"
                            col={{label:3,input:9}}
                            dataSource={this.props.source.ubicacionSite}
                            default={{}}
                            required={true}
                            returnSelect={(value)=>{
                                console.log(value)
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <InputHorario
                            label="Horarios"
                            data={{
                                id:"horaBranch",
                                radioConf:[
                                    {label:"Branch Hour",color:"red",id:1},
                                    {label:"After Hour",color:"blue",id:2},
                                    {label:"Other Hour",color:"green",id:3}]
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <InputHorario
                            label="SLA"
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <InputHorario
                            label="Acceso"
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