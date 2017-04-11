import React from 'react';
import { addModal } from '../../../actions/modalAction';
import { connect } from  'react-redux';

@connect()
export default class inputHorarios extends React.Component{

    openGrafic(){
        this.props.dispatch(addModal({
            body:3,
            data:this.props.data,
            size:"xl"}))
    }

    render(){
        return(
            <div className="form-group">
                <label className={`col-xs-12 control-label col-sm-${this.props.col ? this.props.col.label: 2}`}>{this.props.label}</label>
                <div className={`col-xs-12 col-sm-${this.props.col ? this.props.col.input: 10}`}>
                    <button type="button"
                            className="btn btn-white separarButton"
                            onClick={this.openGrafic.bind(this)}>
                        <i className="fa fa-calendar" />
                    </button>
                </div>
            </div>
        )
    }

}