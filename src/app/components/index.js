import React from 'react';
import { connect } from 'react-redux';
import { VerificarToken } from '../actions/appAction'

class Index extends React.Component{
    componentDidMount(){
        this.props.dispatch(VerificarToken());
    }
    render(){
        return(this.props.parent)
    }
}

const mapStateToProps = (state)=>{
    return{
        parent:state.app.parent
    }
};

export default connect(mapStateToProps)(Index)