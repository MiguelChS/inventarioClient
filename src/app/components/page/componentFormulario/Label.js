/**
 * Created by mc185249 on 5/24/2017.
 */
import React from 'react';

export default (props)=> {
    let value = props.value ? props.value : "";
    return(
        <div className="form-group">
            <label className={`col-xs-12 control-label col-sm-${props.col ? props.col.label: 2}`}>{props.label}</label>
            <div className={`col-xs-12 col-sm-${props.col ? props.col.input: 10}`}>
                <p style={{paddingTop:"7px"}}>{value}</p>
            </div>
        </div>
    )
}