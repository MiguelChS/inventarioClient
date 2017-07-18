import React from 'react';

export default class ItemResult extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            index: this.props.value.index,
            label: this.props.value.label
        }
    }
    returnResult(){
        this.props.select(this.state.index)
    }

    render(){
        const styleDivItem = {
            padding: "3px 10px 3px 20px",
            cursor: "pointer",
            backgroundColor: this.focus ? this.focus : "while"
        }
        return(
            <div style={styleDivItem}
                 onClick={this.returnResult.bind(this)}>
                {this.state.label}
            </div>
        )
    }
}