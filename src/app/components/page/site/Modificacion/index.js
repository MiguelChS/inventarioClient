/**
 * Created by mc185249 on 5/24/2017.
 */
import React from 'react';
import Filtro from './filtro';
import Result from './resultado';

class Modificar extends React.Component{
    render(){
        return(
            <div>
                <Filtro/>
                <Result/>
            </div>
        )
    }
}

export default Modificar;