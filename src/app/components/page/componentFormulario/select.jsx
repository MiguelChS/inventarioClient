import React from 'react';
import { FormGroup , Col, ControlLabel} from 'react-bootstrap';

export default class Select extends React.Component{

    constructor(props){
        super(props);
        let value = -1;

        if(this.props.default){
            value = this.searchDefault(this.props.default);
        }
        this.state = {
            value: value
        }
    }

    searchDefault(value){
        for(let i = 0; i< this.props.dataSource.length ; i++){
            if(this.props.dataSource[i].value == value){
                return  i ;
            }
        }
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
        if(this.props.required && this.state.value == "-1"){
            classRequire = "form-control require-inv";
        }
        return(
            <FormGroup controlId={this.props.id}>
                <Col componentClass={ControlLabel} xs={12} sm={( typeof this.props.col == 'undefined' ? 2 : this.props.col.label)}>
                    {this.props.label}
                </Col>
                <Col xs={12} sm={( typeof this.props.col == 'undefined' ? 10 : this.props.col.input)}>
                    <select className={classRequire} onChange={this.clickSelect.bind(this)} value={this.state.value}>
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