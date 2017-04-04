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

    test(){
        this.props.dispatch({type:"ADD_DATEGRAFIC"})
    }

    render(){
        return(
            <div className="form-group">
                <label className="col-sm-2 col-xs-12 control-label">{this.props.label}</label>
                <div className="col-sm-10 col-xs-12">
                    <button type="button"
                            className="btn btn-white separarButton"
                            onClick={this.openGrafic.bind(this)}
                    >
                        <i className="fa fa-calendar" />
                    </button>
                    <button type="button"
                            onClick={this.test.bind(this)}
                            className="btn btn-white separarButton">
                        <i className="fa fa-list" />
                    </button>
                </div>
            </div>
        )
    }

}