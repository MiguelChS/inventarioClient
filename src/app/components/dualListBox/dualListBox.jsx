import React from 'react';
import BoxFilter from './boxFilter.jsx';

export default class DualListBox extends React.Component{
    constructor(props){
        super(props);

    }

    pasarValor(e) {
        this.dataSource = [...e];
    }

    render(){
        return(
                <div className="row">
                    <BoxFilter orientation="right" pasarValor={this.pasarValor.bind(this)} dataSource={this.props.dataSource} />
                    <BoxFilter orientation="left" dataSource={[]} />
                </div>
        )
    }
}