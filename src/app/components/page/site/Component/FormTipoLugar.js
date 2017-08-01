/**
 * Created by mc185249 on 5/24/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import {AutoComplete,Select} from '../../componentFormulario';
import * as action from '../../../../actions/FormSiteAction';

const FormTipoLugar = (props)=>{
    return(
        <form className="form-horizontal">
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Select
                        label="Lugar"
                        id="idTipoLugar"
                        col={{label:2,input:10}}
                        dataSource={props.source.TipoLugar}
                        default={props.store.Lugar}
                        required={true}
                        returnSelect={(value)=>{
                            if (value && value.value && value.value !== 1) {
                                props.dispatch(action.BuscarSitebyLugar(value.value))
                            }
                            props.dispatch({type: "INSERT_LUGAR_SITE", value: value});
                        }}
                    />
                </div>
                {(()=>{
                    if (!props.store.Lugar || props.store.Lugar.value === 1) return null;
                    return(
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Site"
                                required={true}
                                dataSource={props.store.sourceSitePublic}
                                store={props.store.SitePublic}
                                onChange={(value)=>{
                                    props.dispatch({
                                        type: "INSERT_SITE_PUBLIC_SITE",
                                        value: value
                                    });
                                }}
                                disabled={props.request}
                            />
                        </div>
                    )
                })()}
            </div>
            <div className="row text-center">
                <p className="mjsErr no-margins">{props.store.msjErr}</p>
                <p className="mjsSuccess no-margins">{props.store.mjsSuccess}</p>
            </div>
        </form>
    )
};
const mapStateToProps = (state)=>{
    return {
        store:state.site,
        request:state.app.Request,
        source:state.source
    }
};


export default connect(mapStateToProps)(FormTipoLugar);