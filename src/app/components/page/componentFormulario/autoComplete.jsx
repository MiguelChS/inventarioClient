import React from 'react';
import { FormGroup,Col,ControlLabel} from 'react-bootstrap';
import AutoComplete from '../../AutoComplete/autoComplete.jsx';

export default class AutoCompleteForm extends React.Component{

    resultado(e){
        this.props.resultadoAutoComplete(e);
    }

    render(){
        return(
            <FormGroup controlId={this.props.id}>
                <Col componentClass={ControlLabel} xs={12} sm={(this.props.col ? this.props.col.label : 2 )}>
                    {this.props.label}
                </Col>
                <Col xs={12} sm={(this.props.col ? this.props.col.input : 10 )}>
                    <AutoComplete ref="AutoComplete"
                                  dataSource={this.props.dataSource}
                                  resultado={this.resultado.bind(this)}
                                  required={this.props.required}
                                  id={this.props.id}
                                  firstDefault={this.props.firstDefault}
                                  disabled={this.props.hasOwnProperty("disabled") ? this.props.disabled : false}
                    />
                </Col>
            </FormGroup>
        )
    }
}