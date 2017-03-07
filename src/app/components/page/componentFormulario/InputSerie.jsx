import React from 'react';
import { FormGroup , FormControl, Col, ControlLabel} from 'react-bootstrap';

export default class InputSerie extends React.Component{

    changeField(evt){
        let value = evt.target.value.length ? evt.target.value : null;
        this.props.changeInput(value);
    }

    render(){
        let inputValue = this.props.storeValue ? this.props.storeValue : "";
        let classRequire = "form-control";
        if(this.props.required && !this.props.storeValue){
            classRequire = "form-control require-inv";
        }
        return(
            <FormGroup controlId={this.props.id}>
                <Col componentClass={ControlLabel} xs={12} sm={2}>
                    {this.props.label}
                </Col>
                <Col xs={12} sm={10}>
                    <div className="input-group">
                        <span className="input-group-addon">{this.props.storeValueNoTipeo == null ? '__ - ': `${this.props.storeValueNoTipeo.prefijo} -`}</span>
                        <input type="text" className={classRequire} value={inputValue} onChange={this.changeField.bind(this)}/>
                    </div>
                </Col>
            </FormGroup>
        )
    }
}