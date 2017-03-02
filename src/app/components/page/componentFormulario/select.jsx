import React from 'react';
import { FormGroup , Col, ControlLabel} from 'react-bootstrap';
import OptionSelect from './optionSelect.jsx';
export default class Select extends React.Component{

    clickSelect(e){
        this.props.returnSelect(typeof this.props.dataSource[e.target.value] == 'undefined' ? null : this.props.dataSource[e.target.value]);
    }

    render(){
        return(
            <FormGroup controlId={this.props.id}>
                <Col componentClass={ControlLabel} xs={12} sm={( typeof this.props.col == 'undefined' ? 2 : this.props.col.label)}>
                    {this.props.label}
                </Col>
                <Col xs={12} sm={( typeof this.props.col == 'undefined' ? 10 : this.props.col.input)}>
                    <select className="form-control" onChange={this.clickSelect.bind(this)}>
                        <option value="-1">Seleccione</option>
                        {this.props.dataSource.map((obj,index)=>{
                            return <option key={index} value={index}>{obj.label}</option>
                        })}
                    </select>
                </Col>
            </FormGroup>
        )
    }
}