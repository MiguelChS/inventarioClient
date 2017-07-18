import React from 'react';
import { FormGroup , FormControl, Col, ControlLabel} from 'react-bootstrap';


export default class Input extends React.Component{

    returnResult(e){
        this.props.returnValue(e.target.value);
    }

    dualOrSingle(classRequire,value){
        if(this.props.hasOwnProperty("dual")){
            let classRequireOne = "";
            let classRequireTwo = "";
            if(this.props.required && this.props.dual.inputOne.length == 0){
                classRequireOne = " require-inv";
            }
            if(this.props.required && this.props.dual.inputTwo.length == 0){
                classRequireTwo = " require-inv";
            }
            return(
                <div className="form-group">
                    <label className={`col-xs-12 control-label col-sm-${this.props.col ? this.props.col.label: 2}`}>{this.props.label}</label>
                    <div className={`col-xs-12 col-sm-${this.props.col ? this.props.col.input: 10}`}>
                        <div className="row">
                            <div className="col-xs-6">
                                <input type="text" className={`form-control ${classRequireOne}`}
                                       placeholder={this.props.placeHolder.inputOne}
                                       value={this.props.dual.inputOne}
                                       onChange={(e)=>{
                                           this.props.onChangeInputOne(e.target.value);
                                       }}/>
                            </div>
                            <div className="col-xs-6">
                                <input type="text" className={`form-control ${classRequireTwo}`}
                                       placeholder={this.props.placeHolder.inputTwo}
                                       value={this.props.dual.inputTwo}
                                       onChange={(e)=>{
                                           this.props.onChangeInputTwo(e.target.value);
                                       }}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
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

    render(){
        let value = this.props.value ? this.props.value : "";
        let classRequire = "form-control";
        if(this.props.required && value.length == 0){
            classRequire = "form-control require-inv";
        }
        return(
        this.dualOrSingle(classRequire,value)
        )
    }

}