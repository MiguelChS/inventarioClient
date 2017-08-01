/**
 * Created by mc185249 on 5/23/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import {AutoComplete, Ibox} from '../../componentFormulario/index';
import * as action from '../../../../actions/FormSiteAction';

let filtro = (props)=>{
    return(
        <Ibox Title="Filtro Site">
            <form className="form-horizontal"
                  onSubmit={(event) => {
                      event.preventDefault();
                      props.dispatch(action.BuscarSiteByFiltro())
                  }}
            >
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <AutoComplete
                            label="Client"
                            store={props.store.client}
                            dataSource={props.client}
                            required={true}
                            onChange={(value) => {

                            }}
                            disabled={props.request}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <div className="btn-group">
                            <button className="btn btn-sm btn-white separarButton"
                                    disabled={props.request}
                                    type="submit">
                                Filtrar
                                <i style={{marginLeft: "5px"}} className="fa fa-filter"/>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Ibox>
    )
};

const mapStateToProps = (state) => {
    return{
        institucion:state.app.instituciones,
        request:state.app.Request,
        client: state.app.cliente,
        store:state.siteModi
    }
};

export default connect(mapStateToProps)(filtro);

