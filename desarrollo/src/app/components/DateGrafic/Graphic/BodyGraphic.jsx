import React from 'react';
import RowBody from './rowBody.jsx';

export default (props)=>{
    return (
        <div className="col-xs-12">
            {props.store.matrixHora.map((arrayHs,index)=>{
                if(props.store.diasText[index].show){
                    return <RowBody
                        storeDia={props.store.diasText[index]}
                        key={index}
                        horas={arrayHs}
                        id={props.store.id}
                        dispatch={props.dispatch}
                        paint={props.store.paint}
                    />
                }
            })}
        </div>
    )
}