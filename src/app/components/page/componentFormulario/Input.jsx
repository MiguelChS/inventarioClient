import React from 'react';
import { FormGroup , FormControl, Col, ControlLabel} from 'react-bootstrap';


export default class Input extends React.Component{

    returnResult(e){
        this.props.returnValue(e.target.value);
    }

    render(){
        let value = this.props.value ? this.props.value : "";
        let classRequire = "form-control";
        if(this.props.required && value.length == 0){
            classRequire = "form-control require-inv";
        }
        return(
            <FormGroup controlId={this.props.id}>
                <Col componentClass={ControlLabel} xs={12} sm={this.props.col ? this.props.col.label : 2}>
                    {this.props.label}
                </Col>
                <Col xs={12} sm={this.props.col ? this.props.col.input : 10}>
                    <FormControl
                        bsClass={classRequire}
                        type="text"
                        placeholder={this.props.placeHolder}
                        value={value}
                        onChange={this.returnResult.bind(this)}/>
                </Col>
            </FormGroup>
        )
    }

}