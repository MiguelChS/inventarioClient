import React from 'react';
import { connect } from 'react-redux';
import Formulario from '../Component/FormularioSite';
import Lugar from '../Component/FormTipoLugar';
import * as action from '../../../../actions/FormSiteClientAction';

let Site = (props)=>{
    return(
        <div>
            <div style={style} className="row wrapperWhite">
                <div className="litleHeader col-xs-12">
                    <h5>Filtro</h5>
                </div>
                <div className="litleBody col-xs-12">
                    <Lugar/>
                </div>
            </div>
            <div style={{...style,...{marginTop:"10px"}}} className="row wrapperWhite">
                <div className="litleHeader col-xs-12">
                    <h5>Site Data</h5>
                </div>
                <div className="litleBody col-xs-12">
                    <Formulario/>
                </div>
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