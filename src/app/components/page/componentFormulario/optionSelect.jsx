import React from 'react';

export default class OptionSelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            label:this.props.label,
            value:this.props.value
        }
    }

    render(){
        return(
            <option value={this.state.value} >{this.state.label}</option>
        )
    }
}