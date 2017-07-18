import React from 'react';
import { connect } from 'react-redux';
import { PageLayaout } from '../actions/ActionRouter'

class Index extends React.Component{
    componentDidMount(){
        this.props.dispatch(PageLayaout());
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