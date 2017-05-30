/**
 * Created by mc185249 on 5/23/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row,Col } from 'react-bootstrap';

let resultado = (props)=>{
    return(
        <Row style={{...style,...{marginTop:"10px"}}} bsClass="row wrapperWhite">
            <Col xs={12} bsClass="litleHeader col">
                <h5>Result</h5>
            </Col>
            <Col xs={12} bsClass="litleBody col">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
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

export default connect()(resultado)