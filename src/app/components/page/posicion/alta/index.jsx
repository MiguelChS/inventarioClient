import React from 'react';
import Formulario from './Formulario.jsx';
import { connect } from 'react-redux';
import { Row,Col } from 'react-bootstrap';
import { sendFormulario } from '../../../../actions/formPositionAction';

@connect()
export default class Index extends React.Component{
    render(){
        return(
            <Row style={style} bsClass="row wrapperWhite">
                <Col xs={12} bsClass="litleHeader col">
                    <h5>Alta Posicion</h5>
                </Col>
                <Col xs={12} bsClass="litleBody col">
                    <Formulario
                        id="FormPost"
                        onEnLoad={(form)=>{
                            this.props.dispatch(sendFormulario(form));
                        }}
                    />
                </Col>
            </Row>
        )
    }
}
const style = {
    marginRight:"0",
    marginLeft:"0",
    paddingBottom: "10px",
    borderBottom: "2px solid #e7eaec"
};