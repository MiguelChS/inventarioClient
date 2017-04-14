import React from 'react';
import { connect } from  'react-redux';
import { Row,Col,Form } from 'react-bootstrap';
import { AutoComplete } from '../../componentFormulario/index.js'
import { noSelect } from '../../../../actions/autoCompleteAction.js'
import { hiddenModal,addModal } from '../../../../actions/modalAction.js'
import { assignPosition } from '../../../../actions/equipoAction.js';
import { loadAuto } from '../../../../actions/autoCompleteAction';

@connect((store)=>{
    return{
        source:store.source,
        AutoComplete: store.AutoComplete
    }
})

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
            if(this.AutoSite.indiceSourceSelect != null && this.AutoPosition.indiceSourceSelect == null) this.disabledBtnPos = false;
            if(this.AutoSite.indiceSourceSelect != null && this.AutoPosition.indiceSourceSelect != null) this.disabledBtnAssign = false;
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

/*
*



* */