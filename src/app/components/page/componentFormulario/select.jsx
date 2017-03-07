import React from 'react';
import { FormGroup , Col, ControlLabel} from 'react-bootstrap';

export default class Select extends React.Component{

    searchDefault(value){
        for(let i = 0; i< this.props.dataSource.length ; i++){
            if(this.props.dataSource[i].value == value){
                return  i ;
            }
        }
        return -1;
    }


    clickSelect(e){
        this.setState({
           value:e.target.value
        },()=>{
            this.props.returnSelect(this.state.value == -1 ? null : this.props.dataSource[this.state.value]);
        });
    }

    render(){
        let classRequire = "form-control";
        let value = this.searchDefault(this.props.default);
        if(this.props.required && value == -1 ){
            classRequire = "form-control require-inv";
        }
        return(
            <FormGroup controlId={this.props.id}>
                <Col componentClass={ControlLabel} xs={12} sm={( typeof this.props.col == 'undefined' ? 2 : this.props.col.label)}>
                    {this.props.label}
                </Col>
                <Col xs={12} sm={( typeof this.props.col == 'undefined' ? 10 : this.props.col.input)}>
                    <select className={classRequire} onChange={this.clickSelect.bind(this)} value={this.searchDefault(this.props.default)}>
                        <option value="-1">Seleccione</option>
                        {this.props.dataSource.map((obj,index)=>{
                            return <option key={index} value={index} >{obj.label}</option>
                        })}
                    </select>
                </Col>
            </FormGroup>
        )
    }
}