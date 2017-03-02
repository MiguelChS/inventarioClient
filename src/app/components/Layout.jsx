import React from 'react';
import Nav from './nav/nav.jsx'

export default class Layout extends React.Component{
    render(){
        return(
            <div>
                <Nav/>
                <div className="wrapper-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}