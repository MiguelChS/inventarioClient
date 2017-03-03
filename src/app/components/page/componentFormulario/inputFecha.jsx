import React from 'react';
import { FormGroup , Col,Row, ControlLabel} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
let moment = require('moment');

export default class InputFecha extends React.Component{
    constructor(props){
        super(props);
        let fecha1 = moment(this.props.default.date1);
        let fecha2 = this.props.default.hasOwnProperty("date2") ? moment(this.props.default.date2) : moment();
        this.state={
            min:fecha1,
            max:fecha2,
            fecha1:fecha1,
            fecha2:fecha2
        }
    }

    componentDidMount(){
        this.refs.hasOwnProperty("data1") ? this.refs.data1.refs.input.refs.input.disabled = true : null;
        this.refs.hasOwnProperty("data2") ? this.refs.data2.refs.input.refs.input.disabled = true : null;
    }

    changeDate1(e){
        if(this.refs.hasOwnProperty("data2")){
            this.setState({fecha1:e,min:e},()=>{
                this.props.returnDateInput({
                    f1:this.state.fecha1.format("YYYY-MM-DD"),
                    f2:this.state.fecha2.format("YYYY-MM-DD")
                })
            });
        }else{
            this.setState({fecha1:e});
            this.props.returnDateInput(e.format("YYYY-MM-DD"));
        }
    }

    changeDate2(e){
        this.setState({fecha2:e,max:e},()=>{
            this.props.returnDateInput({
                f1:this.state.fecha1.format("YYYY-MM-DD"),
                f2:this.state.fecha2.format("YYYY-MM-DD")
            })
        });
    }

    render(){
        return(
            <FormGroup controlId={this.props.id}>
                <Col componentClass={ControlLabel} xs={12} sm={( typeof this.props.col == 'undefined' ? 2 : this.props.col.label)}>
                    {this.props.label}
                </Col>
                <Col xs={12} sm={( typeof this.props.col == 'undefined' ? 10 : this.props.col.input)}>
                    {(()=>{
                        if( typeof this.props.dual != 'undefined' && this.props.dual == "true"){
                            return <Row>
                                        <Col xs={6}>
                                            <DatePicker className="form-control" selected={this.state.fecha1} locale="es"  onChange={this.changeDate1.bind(this)} maxDate={this.state.max} ref="data1" mode="date" dateFormat={this.props.format} />
                                        </Col>
                                        <Col xs={6}>
                                            <DatePicker className="form-control" selected={this.state.fecha2} locale="es"  onChange={this.changeDate2.bind(this)} minDate={this.state.min} ref="data2" mode="date" dateFormat={this.props.format} />
                                        </Col>
                                    </Row>
                        }else{
                            return <DatePicker ref="data1" className="form-control" selected={this.state.fecha1} locale="es"  mode="date" onChange={this.changeDate1.bind(this)} dateFormat={this.props.format}/>
                        }
                    })()}
                </Col>
            </FormGroup>
        )
    }
}