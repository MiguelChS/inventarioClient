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

    hoverOn(e){
        e.target.style.backgroundColor = "#e7eaec";
    }

    hoverOff(e){
        e.target.style.backgroundColor = "white";
    }

    render(){
        const styleDivItem = {
            padding:"3px 10px 3px 20px",
            cursor:"pointer"
        };
        return(
            <div style={styleDivItem}
                 onMouseOut={this.hoverOff.bind(this)}
                 onMouseEnter={this.hoverOn.bind(this)}
                 onClick={this.returnResult.bind(this)}>
                {this.state.label}
            </div>
        )
    }
}