import React from 'react';
import { connect } from 'react-redux';
import Formulario from './FormularioSiteClient';
import * as action from '../../../actions/FormSiteAction';

let Site = (props)=>{
    return(
        <div style={style} className="row wrapperWhite">
            <div className="litleHeader col-xs-12">
                <h5>Alta Site Cliente</h5>
            </div>
            <div className="litleBody col-xs-12">
                <Formulario
                    onEndLoadForm={(form)=>{
                        console.log(form);
                    }}
                />
            </div>
        </div>
    )
};
const style = {
    marginRight:"0",
    marginLeft:"0",
    paddingBottom: "10px",
    borderBottom: "2px solid #e7eaec"
};

const mapStateToProps = (state)=>{
    return {
        store:state.site
    }
};

export default connect(mapStateToProps)(Site)