import React from 'react';

export default (props)=>{
    return(
        <div className="container-fluid">
            <div className="row">
                <h4 className="titleModal">{props.Title}</h4>
                <div className="hr-line-dashed"/>
            </div>
            {props.children}
        </div>
    )
}
