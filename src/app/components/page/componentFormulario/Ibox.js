/**
 * Created by mc185249 on 7/17/2017.
 */
import React from 'react';

const style = {
    marginRight: "0",
    marginLeft: "0",
    paddingBottom: "10px",
    borderBottom: "2px solid #e7eaec",
    marginBottom:"10px"
};

export default (props)=>{
    return(
        <div style={style} className="row wrapperWhite">
            <div className="col-xs-12 litleHeader">
                <h5>{props.Title}</h5>
            </div>
            <div className="col-xs-12 litleBody">
                {props.children}
            </div>
        </div>
    )
}