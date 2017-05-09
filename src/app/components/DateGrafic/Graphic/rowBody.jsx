import React from 'react';
import { minusBtnDay,paintBody,paintActive } from '../../../actions/dateGraficAction';


export default (props)=>{
    let store = props.storeDia;
    let icon = "glyphicon-plus";
    icon = store.plus ? icon : "glyphicon-minus";
    let btn = store.main ? `glyphicon ${icon} btnPlus` : "txtDiaMargin";
    let cursorPaint = props.paint ? "paintCursor": "";
    return(
        <div className="row">
            <div className="col-xs-12 col-sm-1">
                <div className="horaHeadText borderLeft">
                    <span className={btn}
                        onClick={()=>{
                            props.dispatch(minusBtnDay({id:props.id,type:store.type}))
                        }}
                    />
                    <p className="textDia">{store.label}</p>
                </div>
            </div>
            <div className={`col-xs-12 col-sm-11 heigth25 ${cursorPaint}`}>
                {props.horas.map((objHs,i) =>{
                    if((i+1)%2 == 0){
                        return(
                            <div key={i} className="cuboHoraHead text-center">
                                <div className="cuboHoraBody" style={{backgroundColor:props.horas[i-1].color}}
                                    onClick={()=>{
                                        props.dispatch(paintActive({
                                            id:props.id,
                                            row:props.horas[i-1].row,
                                            col:props.horas[i-1].col
                                        }))
                                    }}
                                     onMouseEnter={()=>{
                                         if(!props.paint) return;
                                         props.dispatch(paintBody({
                                             id:props.id,
                                             row:props.horas[i-1].row,
                                             col:props.horas[i-1].col
                                         }))
                                     }}
                                />
                                <div className="cuboHoraBody" style={{backgroundColor:objHs.color}}
                                     onClick={()=>{
                                         props.dispatch(paintActive({
                                             id:props.id,
                                             row:objHs.row,
                                             col:objHs.col
                                         }))
                                     }}
                                     onMouseEnter={()=>{
                                         if(!props.paint) return;
                                         props.dispatch(paintBody({
                                             id:props.id,
                                             row:objHs.row,
                                             col:objHs.col
                                         }))
                                     }}
                                />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}