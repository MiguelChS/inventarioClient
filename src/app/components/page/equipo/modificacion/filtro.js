/**
 * Created by mc185249 on 5/23/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { AutoComplete , Select , Input} from '../../componentFormulario/index.js'
import * as action from '../../../../actions/EquipoModificacionAction';

const mapStateToProps= (state)=>{
    return {
        store:state.equipoModi,
        cliente:state.app.cliente,
        request:state.app.Request,
        source:state.source
    }
};

let filtro = (props) => {
    let form = props.store;
    let Institucion = form.cliente && form.cliente.value ? form.cliente.institucion : [];
    return (
        <Row style={style} bsClass="row wrapperWhite">
            <Col xs={12} bsClass="litleHeader col">
                <h5>Filtros</h5>
            </Col>
            <Col xs={12} bsClass="litleBody col">
                <form className="form-horizontal" onSubmit={(event)=>{
                    event.preventDefault();
                    props.dispatch(action.buscarEquipo(form))
                }}>
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <p className="mjsErr">{form.mjsErr}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <Select label="Equipo" id="idEquipo"
                                    dataSource={props.source.Equipos}
                                    default={form.equipo}
                                    disabled={props.request}
                                    returnSelect={(value)=>{
                                        props.dispatch(action.insertEquipo(value));
                                    }}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Cliente"
                                col={{label:2,input:10}}
                                store={form.cliente}
                                dataSource={props.cliente}
                                disabled={props.request}
                                onChange={(value)=>{
                                    props.dispatch(action.insertCliente(value))
                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Institucion"
                                col={{label:2,input:10}}
                                store={form.institucion}
                                disabled={props.request}
                                dataSource={Institucion}
                                onChange={(value)=>{
                                    props.dispatch(action.insertInstitucion(value))
                                }}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Site"
                                dataSource={form.siteSource}
                                store={form.site}
                                col={{input:10,label:2}}
                                disabled={props.request}
                                onChange={(value)=>{
                                    props.dispatch(action.insertSite(value))
                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Pais"
                                col={{label:2,input:10}}
                                store={form.pais}
                                dataSource={props.source.pais}
                                disabled={props.request}
                                onChange={(value)=>{
                                    props.dispatch(action.insertPais(value))
                                }}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <Input
                                value={form.serie}
                                label="Serie"
                                placeHolder="Numero Serie"
                                returnValue={(value)=>{
                                    props.dispatch(action.insertSerie(value));
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
                                    <i style={{marginLeft:"5px"}} className="fa fa-filter"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Col>
        </Row>
    )
};

const style = {
    marginRight: "0",
    marginLeft: "0",
    paddingBottom: "10px",
    borderBottom: "2px solid #e7eaec"
};
export default connect(mapStateToProps)(filtro);

