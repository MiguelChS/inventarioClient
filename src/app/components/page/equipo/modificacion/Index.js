import React from 'react';
import Filtro from './filtro';
import Result from './resultado';

export default class Index extends React.Component{
    render(){
        return(
            <div>
                <Filtro/>
                <Result/>
            </div>
        )
    }
}