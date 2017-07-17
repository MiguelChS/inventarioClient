/**
 * Created by mc185249 on 7/13/2017.
 */
import React from 'react';
import { Form,Row,Col} from 'react-bootstrap';
import { Select,TextArea } from '../componentFormulario/index';
import { connect } from 'react-redux';
import { hiddenModal } from '../../../actions/modalAction.js'
import { changeEstado } from '../../../actions/DbaAction'

let CambiarEstado = (props)=>{
    let form = props.store;
    return(
        <Form horizontal>
            <h4 className="titleModal">Cambiar estado Inicidente</h4>
            <div className="hr-line-dashed"/>
            <div className="row">
                <div className="col-xs-12 text-center">
                    <p className="mjsErr">{form.mjsErr}</p>
                    <p className="mjsSuccess">{form.mjsSuccess}</p>
                </div>
            </div>
            <Row>
                <Col xs={12}>
                    <Select
                        label="Marca"
                        id="idMarca"
                        dataSource={props.sourceState}
                        default={form.estado}
                        required={true}
                        returnSelect={(value)=>{
                            props.dispatch({type:"STATE_INCIDENTE",value:value})
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} >
                        <TextArea
                            value={form.comentario}
                            label="NCR"
                            placeHolder="NCR"
                            returnValue={(value)=>{
                                props.dispatch({type:"COMMENT_INCIDENT",value:value})
                            }}
                        />
                </Col>
            </Row>
            <Row>
                <div className="col-xs-12 text-right">
                    <div className="btn-group separarButton">
                        <button type="button"
                                className="btn btn-white"
                                disabled={(props.request)}
                                onClick={()=>{
                                    if(!form.estado) return;
                                    props.dispatch(changeEstado({
                                        id:props.data.id,
                                        id_estado:form.estado.value,
                                        comentario:form.comentario,
                                        idEquipo:props.data.data.id_equipo
                                    }))
                                }} >
                            Cambiar
                        </button>
                    </div>
                    <div className="btn-group separarButton">
                        <button type="button"
                                disabled={props.request}
                                onClick={()=>{props.dispatch(hiddenModal(props.idModal))}}  className="btn btn-white">
                            Cerrar
                        </button>
                    </div>
                </div>
            </Row>
        </Form>
    )
}

export default connect((state)=>{
    return {
        store:state.chInc,
        request:state.app.Request,
        sourceState : state.dba.stateSoucer
    }
})(CambiarEstado)