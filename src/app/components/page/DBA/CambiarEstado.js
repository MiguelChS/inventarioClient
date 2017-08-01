/**
 * Created by mc185249 on 7/13/2017.
 */
import React from 'react';
import {Select, TextArea, IboxModal} from '../componentFormulario/index';
import { connect } from 'react-redux';
import {hiddenModal} from '../../../actions/modalActionV2'
import { changeEstado } from '../../../actions/DbaAction'

let CambiarEstado = (props)=>{
    let form = props.store;
    return(
        <IboxModal Title="Cambiar estado Ticket">
            <form className="form-horizontal">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <p className="mjsErr">{form.mjsErr}</p>
                        <p className="mjsSuccess">{form.mjsSuccess}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Select
                            label="Estado"
                            id="idEstadoTicket"
                            dataSource={props.sourceState.filter(x => x.value !== 1)}
                            default={form.estado}
                            required={true}
                            returnSelect={(value) => {
                                props.dispatch({type: "STATE_INCIDENTE", value: value})
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <TextArea
                            value={form.comentario}
                            label="Comentario"
                            returnValue={(value)=>{
                                props.dispatch({type:"COMMENT_INCIDENT",value:value})
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 text-right">
                        <div className="btn-group separarButton">
                            <button type="button"
                                    className="btn btn-white"
                                    disabled={(props.request || !(form.estado && form.estado.value))}
                                    onClick={() => {
                                        if (!form.estado) return;
                                        props.dispatch(changeEstado({
                                            id: props.data.id,
                                            id_estado: form.estado.value,
                                            comentario: form.comentario,
                                            data: props.data.data
                                        }, props.idModal))
                                    }}>
                                Cambiar
                            </button>
                        </div>
                        <div className="btn-group separarButton">
                            <button type="button"
                                    disabled={props.request}
                                    onClick={() => {
                                        props.dispatch([
                                            {type: "CLEAR_INCIDENT"},
                                            hiddenModal(props.idModal)
                                        ])
                                    }} className="btn btn-white">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </IboxModal>
    )
}

export default connect((state)=>{
    return {
        store:state.chInc,
        request:state.app.Request,
        sourceState : state.dba.stateSoucer
    }
})(CambiarEstado)