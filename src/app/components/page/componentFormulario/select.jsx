import React from 'react';
import { FormGroup , Col, ControlLabel} from 'react-bootstrap';

export default (props)=>{
    let dataSource = props.dataSource ? props.dataSource : [];
    let classRequire = "form-control";
    let value = searchDefault(props,dataSource);
    if(props.required && value == -1 ){
        classRequire = "form-control require-inv";
    }
    return(
        <FormGroup controlId={props.id}>
            <Col componentClass={ControlLabel} xs={12} sm={( typeof props.col == 'undefined' ? 2 : props.col.label)}>
                {props.label}
            </Col>
            <Col xs={12} sm={( typeof props.col == 'undefined' ? 10 : props.col.input)}>
                <select className={classRequire} onChange={(event)=>{clickSelect(event,props,dataSource)}} value={searchDefault(props,dataSource)}>
                    <option value="-1">Seleccione</option>
                    {dataSource.map((obj,index)=>{
                        return <option key={index} value={index} >{obj.label}</option>
                    })}
                </select>
            </Col>
        </FormGroup>
    )
}

function clickSelect(event,props,dataSource){
    let indice = event.target.value;
    props.returnSelect(indice == -1 ? null : dataSource[indice]);
}

function searchDefault(props,dataSource){
    let value = props.default;
    if(value){
        for(let i = 0; i< dataSource.length ; i++){
            if(dataSource[i].value == value.value){
                return  i ;
            }
        }
    }
    return -1;
}