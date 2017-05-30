/**
 * Created by mc185249 on 5/23/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row,Col } from 'react-bootstrap';

let filtro = (props)=>{
    return(
        <Row style={style} bsClass="row wrapperWhite">
            <Col xs={12} bsClass="litleHeader col">
                <h5>Filtros</h5>
            </Col>
            <Col xs={12} bsClass="litleBody col">

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
export default connect()(filtro);

