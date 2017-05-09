import React from 'react';
import Formulario from './Formulario.jsx';
import { Row,Col } from 'react-bootstrap';

export default class Index extends React.Component{
    render(){
        const style = {
            marginRight:"0",
            marginLeft:"0",
            paddingBottom: "10px",
            borderBottom: "2px solid #e7eaec"
        };

        return(
            <Row style={style} bsClass="row wrapperWhite">
                <Col xs={12} bsClass="litleHeader col">
                    <h5>Alta Posicion</h5>
                </Col>
                <Col xs={12} bsClass="litleBody col">
                    <Formulario
                        id="FormPost"
                        onEnLoad={(form)=>{
                            console.log(form)
                        }}
                    />
                </Col>
            </Row>
        )
    }
}