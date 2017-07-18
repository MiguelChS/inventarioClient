import React from 'react';
import { activeBtn,changeRadio,generateHour } from '../../../actions/dateGraficAction';


export default (props)=>{
    return(
        <div className="row">
            <div className="col-xs-8 text-left">
                {props.store.radioBtn.map((radio,key) =>{
                    return(
                        <label key={key} className="radio-inline">
                            <input type="radio"
                                   name={props.store.id}
                                   value={radio.id}
                                   onChange={(event)=>{
                                        props.dispatch(changeRadio({id:props.store.id,btnId:event.target.value}))
                                   }}
                            />
                            {radio.label}
                        </label>
                    )
                })}
            </div>
            <div className="col-xs-4 text-right" >
                <i className={`fa fa-paint-brush separarButton btnControl ${props.store.btnPaint ? "btnActive" : ""}`}
                   role="button"
                   onClick={()=>{
                       props.dispatch(activeBtn({id:props.store.id,btn:1}))
                   }}
                />
                <i className={`fa fa-eraser separarButton btnControl ${props.store.btnDelete ? "btnActive" : ""}`}
                   role="button"
                   onClick={()=>{
                       props.dispatch(activeBtn({id:props.store.id,btn:2}))
                   }}
                />
                <i className={`fa fa-calendar separarButton btnControl`}
                   role="button"
                   onClick={()=>{
                        props.dispatch(generateHour({id:props.store.id}))
                   }}
                />
            </div>
        </div>
    )
}