import React from 'react';
import { FormGroup , Col,Row, ControlLabel} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
let moment = require('moment');


class InputDate extends React.Component {
    render(){
        return(
            <div className="input-group">
                <input type="text" className={`form-control ${this.props.className}`} value={this.props.value} disabled={true}/>
                <span className="input-group-btn">
                        <button className="btn btn-default"
                                type="button"
                                onClick={()=>{
                                    this.props.onClick()
                                }}
                        >
                            <i className="fa fa-calendar" />
                        </button>
                        <button className="btn btn-default"
                                type="button"
                                onClick={(e)=>{
                                    e.target.value = "";
                                    this.props.onChange(e);
                                }}
                        >
                            <i className="fa fa-trash" />
                        </button>
                    </span>
            </div>
        )
    }
}

export default (props)=>{
    return(
        <FormGroup controlId={props.id}>
            <Col componentClass={ControlLabel} xs={12} sm={( props.col ? props.col.label : 2 )}>
                {props.label}
            </Col>
            <Col xs={12} sm={(props.col ? props.col.input : 10)}>
                <DatePicker
                    customInput={<InputDate/>}
                    className={props.require && !props.store ? "require-inv" : "" }
                    selected={ props.store ? moment(props.store) : null}
                    locale="es"
                    onChange={(e)=>{
                        props.returnDateInput(e ? e.format("YYYY-MM-DD") : null);
                    }}
                    mode="date"
                    dateFormat={props.format}
                />
            </Col>
        </FormGroup>
    )
};
