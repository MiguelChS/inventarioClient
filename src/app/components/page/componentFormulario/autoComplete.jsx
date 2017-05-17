import React from 'react';
import { FormGroup,Col,ControlLabel} from 'react-bootstrap';
import AutoComplete from '../../AutoComplete/autoCompletV2';

export default (props)=>{
    return(
        <FormGroup controlId={props.id}>
            <Col componentClass={ControlLabel} xs={12} sm={(props.col ? props.col.label : 2 )}>
                {props.label}
            </Col>
            <Col xs={12} sm={(props.col ? props.col.input : 10 )}>
                <AutoComplete
                    dataSource={props.dataSource}
                    onChange={(value)=>{
                        props.onChange(value)
                    }}
                    required={props.required}
                    disabled={props.hasOwnProperty("disabled") ? props.disabled : false}
                    store={props.store}
                />
            </Col>
        </FormGroup>
    )
}