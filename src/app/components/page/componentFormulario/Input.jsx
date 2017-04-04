import React from 'react';
import { FormGroup , FormControl, Col, ControlLabel} from 'react-bootstrap';


export default class Input extends React.Component{

    returnResult(e){
        this.props.returnValue(e.target.value);
    }

    render(){
        return(
            <FormGroup controlId={this.props.id}>
                <Col componentClass={ControlLabel} xs={12} sm={2}>
                    {this.props.label}
                </Col>
                <Col xs={12} sm={10}>
                    <FormControl type="text"
                                 placeholder={this.props.placeHolder}
                                 value={this.props.value}
                                 onChange={this.returnResult.bind(this)}/>
                </Col>
            </FormGroup>
        )
    }

}