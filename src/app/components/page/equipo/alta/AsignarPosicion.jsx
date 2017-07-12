import React from 'react';
import { connect } from  'react-redux';
import { Row,Col,Form } from 'react-bootstrap';
import { AutoComplete } from '../../componentFormulario/index.js'
import { hiddenModal,addModal } from '../../../../actions/modalAction.js'
import { assignPosition,assignPosicionEdit } from '../../../../actions/equipoAction.js';
import * as action from '../../../../actions/AsignarPosicionAction';
import BoxFilter from '../../../boxFilter/index.jsx';
import { sendFormulario, insertCliente,insertSite} from '../../../../actions/formPositionAction';

@connect((store)=>{
    return{
        request:store.app.Request,
        store:store.assignPosicion
    }
})
export default class AsignarPosicion extends React.Component{
    constructor(props){
        super(props);
    }

    assign(){
        let props = this.props.store;
        if(this.props.data.hasOwnProperty("form")){
            this.props.dispatch([
                assignPosicionEdit({
                    site:props.Site,
                    SiteClient:props.SiteClient,
                    position:props.posicion,
                    formid:this.props.data,
                    prestacion:props.prestacion
                }),
                hiddenModal(this.props.idModal)
            ]);
        }else{
            //esto es para el alta de equipo
            this.props.dispatch([
                assignPosition({
                    site:props.Site,
                    SiteClient:props.SiteClient,
                    position:props.posicion,
                    formid:this.props.data,
                    prestacion:props.prestacion
                }),
                hiddenModal(this.props.idModal)
            ])
        }
    }

    cancelar(){
        this.props.dispatch([
            hiddenModal(this.props.idModal),
            action.clearForm()
        ])
    }

    newPosition(){
        let form;
        if(this.props.data.hasOwnProperty("form")){
            form = this.props.data.form;
        }else{
            form = JSON.parse(localStorage.getItem(this.props.data));
        }
        this.props.dispatch([
            insertCliente(form.cliente),
            insertSite(this.props.store.Site),
            addModal({
                body:2,
                data:{},
                size:"xl"
            })
        ])
    }
    componentDidMount(){
        let form;
        if(this.props.data.hasOwnProperty("form")){
            form = this.props.data.form;
        }else{
            form = JSON.parse(localStorage.getItem(this.props.data));
        }
        this.props.dispatch([
            action.preCargaFormulario(form)
        ])
    }

    render(){
        let props = this.props.store;
        return(
            <Form horizontal>
                <h4 className="titleModal">Asignar Posicion</h4>
                <div className="hr-line-dashed"/>
                <Row>
                    <Col xs={12}>
                        <AutoComplete
                            label="Site"
                            dataSource={props.siteSource}
                            store={props.Site}
                            col={{input:9,label:3}}
                            required={true}
                            disabled={this.props.request}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertSite(value))
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} >
                        <AutoComplete
                            label="Posicion"
                            col={{input:9,label:3}}
                            dataSource={props.posicionSource}
                            disabled={(this.props.request || props.newPosicion)}
                            store={props.posicion}
                            required={true}
                            onChange={(value)=>{
                                this.props.dispatch(action.insertPosicion(value))
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} >
                        {(()=> {
                            if (props.prestacion.length == 0) return null;
                            return(
                                <BoxFilter
                                    data={props.prestacion}
                                    result={(value)=>{
                                        this.props.dispatch(action.insertHoraPrestacion(value));
                                    }}
                                />
                            )
                        })()}
                    </Col>
                </Row>
                <Row>
                    <div className="col-xs-12 text-right">
                        <div className="btn-group separarButton">
                            <button type="button"
                                    disabled={(this.props.request || !(props.Site && props.Site.value))}
                                    onClick={this.newPosition.bind(this)} className="btn btn-white">
                                Nueva Posicion
                        </button>
                        </div>
                        <div className="btn-group separarButton">
                            <button type="button" disabled={this.props.request} onClick={this.assign.bind(this)} className="btn btn-white">
                                Asignar
                            </button>
                        </div>
                        <div className="btn-group separarButton">
                            <button type="button" disabled={this.props.request} onClick={this.cancelar.bind(this)}  className="btn btn-white">
                                cancelar
                            </button>
                        </div>
                    </div>
                </Row>
            </Form>
        )
    }
}
