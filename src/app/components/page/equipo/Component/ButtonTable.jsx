/**
 * Created by mc185249 on 3/10/2017.
 */
import React from 'react';

export default class ButtonTable extends React.Component{

    click(){
        this.props.click(this.props.data)
    }

    render(){
        let text_icono = "";
        if(this.props.icono){
            text_icono=(<i className={`fa ${this.props.icono}`}/>);
        }else{
            text_icono=this.props.text;
        }
        return(
            <button className="btn btn-white btn-xs separarButton" onClick={this.click.bind(this)}>
                {text_icono}
            </button>
            )
    }
}