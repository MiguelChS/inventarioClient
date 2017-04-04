import React from 'react';
import { Row,Col,Form } from 'react-bootstrap';
import { AutoComplete } from '../../componentFormulario/index.js'
import { noSelect } from '../../../../actions/autoCompleteAction.js'
import { hiddenModal,addModal } from '../../../../actions/modalAction.js'
import { assignPosition } from '../../../../actions/equipoAction.js';

export default class AsignarPosicion extends React.Component{

    assign(){
        if(!this.disabledBtnAssign){
            this.props.dispatch([
                assignPosition({
                site:this.AutoSite,
                position:this.AutoPosition,
                formid:this.props.data
                }),
                hiddenModal(this.props.idModal)
            ])
        }
    }


    cancelar(){
        this.props.dispatch(hiddenModal(this.props.idModal))
    }

    newPosition(){
        this.props.dispatch(addModal({body:2,data:null,size:"xl"}))
    }

    render(){
        let source = this.props.store.equipo.source;
        this.AutoSite = this.props.store.AutoComplete.find( obj => obj.id == "idSite");
        this.AutoPosition = this.props.store.AutoComplete.find( obj => obj.id == "idPosicion");
        let idSite = this.AutoSite.indiceSourceSelect != null ? source.site[this.AutoSite.indiceSourceSelect]["value"] : null;

        this.disabledBtnPos = true;
        this.disabledBtnAssign = true;
        if(this.AutoSite.indiceSourceSelect != null && this.AutoPosition.indiceSourceSelect == null) this.disabledBtnPos = false;
        if(this.AutoSite.indiceSourceSelect != null && this.AutoPosition.indiceSourceSelect != null) this.disabledBtnAssign = false;

        return(
            <Form horizontal>
                <h4 className="titleModal">Asignar Posicion</h4>
                <div className="hr-line-dashed"/>
                <Row>
                    <Col xs={12}>
                        <AutoComplete label="Site"
                                      id="idSite"
                                      dataSource={source.site}
                                      Store={this.AutoSite}
                                      required={true}
                                      resultadoAutoComplete={(value)=>{
                                          if(value) return;
                                          this.props.dispatch(noSelect({id:this.AutoPosition.id,value:""}));
                                      }}
                                      dispatch={this.props.dispatch}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} >
                        <AutoComplete label="Posicion"
                                      id="idPosicion"
                                      dataSource={source.position[idSite] ? source.position[idSite] : []}
                                      Store={this.AutoPosition}
                                      required={true}
                                      resultadoAutoComplete={()=>{
                                      }}
                                      dispatch={this.props.dispatch}
                        />
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