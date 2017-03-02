import React from 'react';
import { FormGroup , FormControl, Col, ControlLabel} from 'react-bootstrap';

export default class InputSerie extends React.Component{

    changeField(evt){
        let own = {};
        own["value"] = evt.target.value;
        this.props.changeInput(evt.target.value);
    }

    render(){
        return(
            <FormGroup controlId={this.props.id}>
                <Col componentClass={ControlLabel} xs={12} sm={2}>
                    {this.props.label}
                </Col>
                <Col xs={12} sm={10}>
                    <div className="input-group">
                        <span className="input-group-addon">{this.props.storeValueNoTipeo == null ? '__ - ': `${this.props.storeValueNoTipeo.prefijo} -`}</span>
                        <input type="text" className="form-control" value={this.props.storeValue} onChange={this.changeField.bind(this)}/>
                    </div>
                </Col>
            </FormGroup>
        )
    }
}