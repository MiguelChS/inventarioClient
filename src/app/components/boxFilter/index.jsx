/**
 * Created by mc185249 on 4/17/2017.
 */
import React from 'react';
import { connect } from  'react-redux';
import { addModal } from '../../actions/modalAction';
import { loadResult,loadHour} from '../../actions/boxFilterAction';

@connect((store)=>{
    return{
        store:store.BoxFilter
    }
})
export default class BoxFilter extends React.Component{

    componentDidMount(){
        console.log(this.props.data);
        let result = this.props.data.map((obj) => {
            return {
                data:{...obj},
                hora:obj.hasOwnProperty("hora") ? obj.hora : null
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
                                {this.props.data.map((obj,index)=>{
                                    return <div key={index} className="row">
                                        <div className="col-xs-12 hoverItem">
                                            <label className="checkbox-inline">
                                                {obj.label}
                                            </label>
                                            <button type="button" className={`btn btn-xs btn-white btnBoxFilter ${obj.hasOwnProperty("hora") ? "" : "require-inv"}`}
                                                    onClick={()=> {
                                                        this.props.dispatch(
                                                            addModal({
                                                                body:3,
                                                                data:{
                                                                    id:obj.value,
                                                                    radioConf:[
                                                                        {label:obj.label,color:"green",id:obj.value}
                                                                    ],
                                                                    firstDefault:obj.hasOwnProperty("hora") ? obj.hora : null,
                                                                    hour24:false,
                                                                    callbackResult:(value)=>{
                                                                        this.props.result(value);
                                                                    }
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