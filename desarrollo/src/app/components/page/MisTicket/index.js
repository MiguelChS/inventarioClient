import React from 'react';
import { connect }  from 'react-redux';
import Filtro from  './Filtro';
import Tabla from './Tabla'

export default connect()(()=>{
    return(
        <div>
            <Filtro/>
            <Tabla/>
        </div>
    )
})