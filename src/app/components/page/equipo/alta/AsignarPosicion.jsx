import React from 'react';
import { connect } from  'react-redux';
import { Row,Col,Form } from 'react-bootstrap';
import { AutoComplete } from '../../componentFormulario/index.js'
import { noSelect } from '../../../../actions/autoCompleteAction.js'
import { hiddenModal,addModal } from '../../../../actions/modalAction.js'
import { assignPosition } from '../../../../actions/equipoAction.js';
import { insertTemporalPosicion } from '../../../../actions/sourceAction'
import BoxFilter from '../../../boxFilter/index.jsx';

@connect((store)=>{
    return{
        source:store.source,
        AutoComplete: store.AutoComplete
    }
})

export default class AsignarPosicion extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            horaPrestacion:[],
            prestacion:[]
        };
    }

    assign(){
        if(!this.disabledBtnAssign){
            this.props.dispatch([
                assignPosition({
                    site:this.AutoSite,
                    position:this.AutoPosition,
                    formid:this.props.data,
                    horaPrestacion:this.state.horaPrestacion
                }),
                hiddenModal(this.props.idModal)
            ])
        }
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
                        idSite:form.id_site,
                        label:form.ncr_id,
                        Form:form,
                    }))
                }
            },
            size:"xl"
        }))
    }

    addPrestacion(hourPrestacion){
        let auxPres = this.state.horaPrestacion.find(obj => obj.idHora == hourPrestacion.idHora);
        if(auxPres){
            if(hourPrestacion.hora){
                //update
                this.setState({horaPrestacion:this.state.horaPrestacion.map(obj=>{
                    if(obj.idHora == hourPrestacion.idHora){
                        obj.hora = hourPrestacion.hora;
                    }
                    return obj;
                })})
            }else{
                //remove
                this.setState({horaPrestacion:this.state.horaPrestacion.filter(fil=>fil.idHora != hourPrestacion.idHora)})
            }
        }else{
            //insert
            this.setState({horaPrestacion:[...this.state.horaPrestacion,hourPrestacion]})
        }
    }

    componentDidMount(){
        let stateForm = JSON.parse(localStorage.getItem(this.props.data)).form;
        let prestacionHora = [];
        let prestacionBoxFilter = [];
        //verificamos tiene prestacion pre cargadas
        if(stateForm.prestacion.length > 0){
            prestacionBoxFilter = stateForm.prestacion.map((obj)=>{
                let tipoHora = this.props.source.TypeHora.find(vent => vent.value == obj.idHora);
                //obj.hora
                let hora ={};
                hora[obj.idHora] = obj.hora;
                prestacionHora.push({
                    idHora:obj.idHora,
                    hora:hora,
                });
                return{...tipoHora,...{data:hora}}
            });
        }else{
            stateForm.modulos.map((obj,index)=>{
                let y = null;
                stateForm.modulos.find((fil,index)=> { if(fil.idVentana == obj.idVentana){ y = index}});
                if(index == y && obj.idVentana != null){
                    prestacionBoxFilter.push(this.props.source.TypeHora.find(vent => vent.value == obj.idVentana))
                }
            });
        }
        this.setState({horaPrestacion:prestacionHora,prestacion:prestacionBoxFilter});

    }

    render(){
        let source = this.props.source;
        let autoComp = JSON.parse(localStorage.getItem(this.props.data)).AutoComplete;
        this.AutoSite = this.props.AutoComplete.find( obj => obj.id == "idSite");
        this.AutoPosition = this.props.AutoComplete.find( obj => obj.id == "idPosicion");
        let sourcePosition = [];
        if(this.AutoSite){
            let idSite = this.AutoSite.indiceSourceSelect != null ? source.site[this.AutoSite.indiceSourceSelect]["value"] : null;
            sourcePosition = source.position[idSite] ? source.position[idSite] : [];
        }
        this.disabledBtnPos = true;
        this.disabledBtnAssign = true;
        if(this.AutoSite && this.AutoPosition){
            if(this.AutoSite.indiceSourceSelect != null
                && this.AutoPosition.indiceSourceSelect == null) this.disabledBtnPos = false;
            if(this.AutoSite.indiceSourceSelect != null
                && this.AutoPosition.indiceSourceSelect != null
                && this.state.horaPrestacion.length == this.state.prestacion.length ) this.disabledBtnAssign = false;
        }
        return(
            <Form horizontal>
                <h4 className="titleModal">Asignar Posicion</h4>
                <div className="hr-line-dashed"/>
                <Row>
                    <Col xs={12}>
                        <AutoComplete label="Site"
                                      id="idSite"
                                      dataSource={source.site}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          if(value) return;
                                          this.props.dispatch(noSelect({id:this.AutoPosition.id,value:""}));
                                      }}
                                      firstDefault={autoComp.find(obj => obj.id == "idSite")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} >
                        <AutoComplete label="Posicion"
                                      id="idPosicion"
                                      dataSource={sourcePosition}
                                      required={true}
                                      resultadoAutoComplete={()=>{

                                      }}
                                      firstDefault={autoComp.find(obj => obj.id == "idPosicion")}
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
                                        this.addPrestacion(value);
                                    }}
                                />
                            )
                        })()}
                    </Col>
                </Row>
                <Row>
                    <div className="col-xs-12 text-right">
                        <div className="btn-group separarButton">
                            <button type="button" disabled={this.disabledBtnPos} onClick={this.newPosition.bind(this)} className="btn btn-white">
                                Nueva Posicion
                            </button>
                        </div>
                        <div className="btn-group separarButton">
                            <button type="button" disabled={this.disabledBtnAssign} onClick={this.assign.bind(this)} className="btn btn-white">
                                Asignar
                            </button>
                        </div>
                        <div className="btn-group separarButton">
                            <button type="button" onClick={this.cancelar.bind(this)}  className="btn btn-white">
                                cancelar
                            </button>
                        </div>
                    </div>
                </Row>
            </Form>
        )
    }
}
