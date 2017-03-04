import React from 'react';
import BoxFilter from './boxFilter.jsx';

export default class DualListBox extends React.Component{
    constructor(props){
        super(props);
    }

    selectModule(value) {
        this.props.select(value)
    }

    selectALLModule(value){
        this.props.selectAll(value)
    }

    changeShow(value){
        this.props.changeShow(value)
    }

    render(){
        return(
                <div className="row">
                    <BoxFilter
                        orientation="right"
                        dataSource={this.props.dataSource}
                        selectModule={this.selectModule.bind(this)}
                        selected={0}
                        selectAll={this.selectALLModule.bind(this)}
                        changeShow={this.props.changeShow.bind(this)}
                    />
                    <BoxFilter
                        orientation="left"
                        dataSource={this.props.dataSource}
                        selectModule={this.selectModule.bind(this)}
                        selectAll={this.selectALLModule.bind(this)}
                        changeShow={this.props.changeShow.bind(this)}
                        selected={1}
                    />
                </div>
        )
    }
}