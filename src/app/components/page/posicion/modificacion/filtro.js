import React from 'react';
import { connect } from 'react-redux';
import {Ibox, Input, AutoComplete, Select} from '../../componentFormulario';
import {getSite} from '../../../../actions/sourceAction';
import {buscarPosicion} from '../../../../actions/PosicionAction';

const mapStatetoProps = (state) => {
    return {
        store: state.editPos,
        cliente: state.app.cliente,
        request: state.app.Request,
        source: state.source
    }
};

export default connect(mapStatetoProps)((props) => {
    let form = props.store;
    return(
        <Ibox Title="Filtro Posicion">
            <form
                className="form-horizontal"
                onSubmit={(event) => {
                    event.preventDefault();
                    props.dispatch(buscarPosicion(form))
                }}
            >
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <p className="mjsErr">{form.mjsErr}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <Input
                            value={form.posicion}
                            label="Posicion"
                            placeHolder=""
                            returnValue={(value) => {
                                props.dispatch({type: "POSOCION_POS_EDIT", value: value})
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Cliente"
                            col={{label: 2, input: 10}}
                            store={form.cliente}
                            dataSource={props.cliente}
                            disabled={props.request}
                            onChange={(value) => {
                                if (value && value.value) {
                                    props.dispatch(getSite(value.value))
                                }
                                props.dispatch({type: "CLIENTE_POS_EDIT", value: value})
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Site"
                            store={form.site}
                            dataSource={props.source.site}
                            disabled={props.request}
                            onChange={(value) => {
                                props.dispatch({type: "SITE_POS_EDIT", value: value})
                            }}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <Select
                            label="Tipo Site"
                            id="tipoSite"
                            dataSource={props.source.TipoSite}
                            default={form.tipoSite}
                            disabled={props.request}
                            returnSelect={(value) => {
                                props.dispatch({type: "TIPO_SITE_POS_EDIT", value: value})
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <div className="btn-group">
                            <button className="btn btn-sm btn-white separarButton"
                                    disabled={props.request}
                                    type="submit">
                                Filtrar
                                <i style={{marginLeft: "5px"}} className="fa fa-filter"/>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Ibox>
    )
})