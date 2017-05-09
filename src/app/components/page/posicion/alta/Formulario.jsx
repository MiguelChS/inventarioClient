import React from 'react';
import { connect } from  'react-redux';
import { AutoComplete , Select, Input,InputHorario } from '../../componentFormulario/index.js'
import BoxFilter from '../../../boxFilter/index.jsx';
import  * as action from '../../../../actions/formPositionAction';

@connect((store)=>{
    return {
        fomPos:store.formPosition,
        source:store.source
    }
})

export default class Formulario extends React.Component{

    componentDidMount(){
        if(!this.store){
            this.props.dispatch(action.addFormPos({id:this.props.id}))
        }
    }

    componentWillUnmount(){
        this.props.dispatch(action.removeFormPost(this.props.id))
    }

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
        let formAux = this.store;
        let form = {
            "ncr_id": formAux.ncr,
            "id_site":formAux.site.value,
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
            "id_site_cliente":0
        };
        this.props.onEnLoad(form);
    }

    searchPrestacion(value){
        if(value){
            this.props.dispatch([
                action.insertStateRequtes({id:this.store.id,value:true}),
                action.insertEquipo({id:this.store.id,value:value}),
                action.searchPrestacionEquipo(this.store.id,value.value)
            ])
        }else{
            this.props.dispatch([
                action.insertEquipo({id:this.store.id,value:value}),
                action.insertIdPrestaciones({id:this.store.id,value:[]})
            ])
        }
    }

    render(){
        this.store = this.props.fomPos.find(obj => obj.id == this.props.id);
        if(!this.store) return null;
        //vericamos si viene las prestacion por las propiedades
        let prestacion;
        if(!this.props.hasOwnProperty("prestacion")){
            prestacion = this.store.idPrestaciones.map((id)=>{
                return this.props.source.TypeHora.find(x => x.value == id.idVentanaHoraria);
            });
        }else{
            prestacion = this.props.prestacion;
        }

        return (
            <form className="form-horizontal">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <p className="mjsErr">{this.store.mjsErr}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Input
                            value={this.store.cliente ? this.store.cliente: ""}
                            label="Cliente"
                            placeHolder="name Cliente"
                            returnValue={(value)=>{
                                this.props.dispatch(action.insertClient({id:this.store.id,text:value}));
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Input
                            value={this.store.ncr ? this.store.ncr: ""}
                            label="NCR"
                            placeHolder="NCR"
                            returnValue={(value)=>{
                                this.props.dispatch(action.insertNCR({id:this.store.id,text:value}));
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Input
                            value={this.store.ip ? this.store.ip: ""}
                            label="IP"
                            placeHolder="IP"
                            returnValue={(value)=>{
                                this.props.dispatch(action.insertIP({id:this.store.id,text:value}));
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Site"
                                      id="idSitePost"
                                      dataSource={this.props.source.site}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(action.insertSite({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Gaveta"
                                      id="idGaveta"
                                      dataSource={this.props.source.gavetas}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(action.insertGaveta({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Status"
                                      id="idTableStatus"
                                      dataSource={this.props.source.tablaStatus}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(action.insertTableStatus({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Script"
                                      id="idScript"
                                      dataSource={this.props.source.callingScript}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(action.insertScript({id:this.store.id,value:value}));
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
                                          this.props.dispatch(action.insertCommand({id:this.store.id,value:value}));
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
                                          this.props.dispatch(action.insertCommunityString({id:this.store.id,value:value}));
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
                                          this.props.dispatch(action.insertComunicacion({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="SLM"
                                      id="idSLM"
                                      dataSource={this.props.source.slm}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(action.insertSLM({id:this.store.id,value:value}));
                                      }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="FLM"
                                      id="idFLM"
                                      dataSource={this.props.source.flm}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(action.insertFLM({id:this.store.id,value:value}));
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
                                this.props.dispatch(action.insertUbicacion({id:this.store.id,value:value}));
                            }}
                        />
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <AutoComplete label="Prestacion"
                                      col={{label:3,input:9}}
                                      id="idPrestacion"
                                      dataSource={this.props.source.prestacion}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          this.props.dispatch(action.insertPRESTACION({id:this.store.id,value:value}));
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
                                    this.props.dispatch(action.insertHourBranch({id:this.store.id,value:value}));
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
                                callbackResult:(value)=>{
                                    this.props.dispatch(action.insertHourSLA({id:this.store.id,value:value}));
                                },
                                firstDefault:this.store.sla
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
                                    this.props.dispatch(action.insertHourAccess({id:this.store.id,value:value}));
                                },
                                firstDefault:this.store.access
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
                                callbackResult:(value)=>{
                                    this.props.dispatch(action.insertHourPeak({id:this.store.id,value:value}));
                                },
                                firstDefault:this.store.hourPeak
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
                                callbackResult:(value)=>{
                                    this.props.dispatch(action.insertHourOperation({id:this.store.id,value:value}));
                                },
                                firstDefault:this.store.hourOperation
                            }}
                        />
                    </div>
                    {(()=>{
                        if(this.props.hasOwnProperty("prestacion")) return null;
                        return (
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <AutoComplete label="Equipo"
                                              id="idEquipoPos"
                                              col={{label:3,input:9}}
                                              dataSource={this.props.source.EquiposAll}
                                              required={true}
                                              resultadoAutoComplete={(value)=>{
                                                  this.searchPrestacion(value);
                                              }}
                                              disabled={this.store.stateRequtes}
                                />
                            </div>
                        )
                    })()}
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