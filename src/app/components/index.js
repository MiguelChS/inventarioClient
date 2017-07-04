import React from 'react';
import { connect } from 'react-redux';
import { getDataUser } from '../actions/appAction'

class Index extends React.Component{
    componentDidMount(){
        this.props.dispatch(getDataUser());
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