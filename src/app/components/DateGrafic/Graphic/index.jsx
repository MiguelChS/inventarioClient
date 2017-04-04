import React from 'react';
import HeadGraphic from './HeadGraphic.jsx';
import BodyGraphic from './BodyGraphic.jsx';

export default (props)=>{
    return(
        <div className="row">
            <HeadGraphic/>
            <BodyGraphic store={props.store} dispatch={props.dispatch}/>
        </div>
    )
}