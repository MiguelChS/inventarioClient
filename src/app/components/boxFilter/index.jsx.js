/**
 * Created by mc185249 on 4/17/2017.
 */
import React from 'react';
import { connect } from  'react-redux';
import { addModal } from '../../actions/modalAction';
import { loadResult,loadHour,checkedPretacion } from '../../actions/boxFilterAction';

@connect((store)=>{
    return{
        store:store.BoxFilter,
        source:store.source
    }
})
export default class BoxFilter extends React.Component{

    componentDidMount(){
        let result = this.props.source.prestacion.map((obj)=>{
            return {
                data:{...obj},
                hora:null,
                selected: false
            }
        });
        this.props.dispatch(loadResult(result))
    }

    render(){
        let store = this.props.store;
        return(
            <div className="row boxConten">
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Prestacion</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="boxFilterPrestacion">
                                {store.result.map((obj,index)=>{
                                    return <div key={index} className="row">
                                        <div className="col-xs-12 hoverItem">
                                            <label className="checkbox-inline">
                                                <input type="checkbox" disabled={obj.hora == null} checked={obj.selected} value={obj.data.value}
                                                       onChange={(event)=>{
                                                           this.props.dispatch(checkedPretacion({id:event.target.value}));
                                                           this.props.result(obj)
                                                       }} />
                                                {obj.data.label}
                                            </label>
                                            <button type="button" className="btn btn-xs btn-white btnBoxFilter"
                                                    onClick={()=> {
                                                        this.props.dispatch(addModal({
                                                            body:3,
                                                            data:{
                                                                id:obj.data.value,
                                                                radioConf:[
                                                                    {label:obj.data.label,color:"green",id:obj.data.value}
                                                                ],
                                                                hour24:false,
                                                                callbackResult:(value)=>{
                                                                    this.props.dispatch(loadHour({
                                                                        id:obj.data.value,
                                                                        hora:value
                                                                    }))
                                                                },
                                                                firstDefault:obj.hora
                                                            },
                                                            size:"xl"}))
                                                    }}
                                            >
                                                <i className="fa fa-calendar" />
                                            </button>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}