import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { AutoComplete , Select , Input} from '../componentFormulario/index.js'
import  * as action from '../../../actions/DbaReducer'
var Filtro = (props)=>{
    let form = {};
    return(
        <Row style={style} bsClass="row wrapperWhite">
            <Col xs={12} bsClass="litleHeader col">
                <h5>Filtros</h5>
            </Col>
            <Col xs={12} bsClass="litleBody col">
                <form className="form-horizontal" onSubmit={(event)=>{
                    event.preventDefault();
                }}>
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <p className="mjsErr">{form.mjsErr}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <Select label="Equipo" id="idEquipo"
                                    dataSource={[]}
                                    default={form.equipo}
                                    disabled={props.request}
                                    returnSelect={(value)=>{

                                    }}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Cliente"
                                col={{label:2,input:10}}
                                store={form.cliente}
                                dataSource={[]}
                                disabled={props.request}
                                onChange={(value)=>{

                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <div className="btn-group">
                                <button className="btn btn-sm btn-white separarButton"
                                        disabled={props.request}
                                        onClick={()=>{props.dispatch(action.getIncientes())}}
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

const mapStateToProps =(state)=>{
    return {
        request:state.app.Request
    }
};
export default connect(mapStateToProps)(Filtro)