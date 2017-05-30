/**
 * Created by mc185249 on 5/23/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row,Col } from 'react-bootstrap';
import {AutoComplete,Input} from '../../componentFormulario/index';
import * as action from '../../../../actions/ModificacionSiteAction';

let filtro = (props)=>{
    return(
        <Row style={style} bsClass="row wrapperWhite">
            <Col xs={12} bsClass="litleHeader col">
                <h5>Filtros</h5>
            </Col>
            <Col xs={12} bsClass="litleBody col">
                <form className="form-horizontal">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Lugar"
                                dataSource={props.Lugar}
                                required={true}
                                store={props.store.Lugar}
                                onChange={(value)=>{
                                    props.dispatch(action.insertClient(value));
                                }}
                                disabled={props.request}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Site"
                                required={true}
                                dataSource={props.sourceSite}
                                store={props.store.site}
                                onChange={(value)=>{
                                    props.dispatch(action.insertSite(value));
                                }}
                                disabled={props.request}
                            />
                        </div>
                    </div>
                </form>
            </Col>
        </Row>
    )
};


const style = {
    marginRight:"0",
    marginLeft:"0",
    paddingBottom: "10px",
    borderBottom: "2px solid #e7eaec"
};
const mapStateToProps = (state) => {
    return{
        institucion:state.app.instituciones,
        request:state.app.Request,
        store:state.siteModi
    }
};

export default connect(mapStateToProps)(filtro);

