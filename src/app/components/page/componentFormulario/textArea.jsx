/**
 * Created by mc185249 on 4/24/2017.
 */
import React from 'react';

export default (props)=>{
    let value = props.value ? props.value : "";
    let classRequire = "form-control";
    if(props.required && value.length == 0){
        classRequire = "form-control require-inv";
    }
    return(
        <div className="form-group">
            <label className="col-sm-2 control-label">{props.label}</label>
            <div className="col-sm-10">
                <textarea className={classRequire}
                          placeholder={props.placeholder}
                          rows="3"
                          onChange={(event)=>{
                              props.returnValue(event.target.value)
                          }}
                          value={value}/>
            </div>
        </div>
    )
}