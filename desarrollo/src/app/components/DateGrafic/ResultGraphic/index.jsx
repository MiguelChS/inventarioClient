import React from 'react';
import BodyResult from './BodyResult.jsx';
export default (props)=>{
    return(
        <div className="row">
            <div className="col-xs-12">
                {props.store.radioBtn.map((obj,index)=>{
                   return <BodyResult
                            key={index}
                            label={obj.label}
                            color={obj.color}
                            result={props.store.matrixGroup[obj.id] ? props.store.matrixGroup[obj.id] : []}
                        />
                })}
            </div>
        </div>
    )
}