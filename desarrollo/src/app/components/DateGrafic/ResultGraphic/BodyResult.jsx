/**
 * Created by mc185249 on 4/4/2017.
 */
import moment from 'moment';
import React from 'react';

function textHour(objHora) {
    //Lunes a Viernes 10:00 hs a 19:00 hs
    let Dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
    let hourInt = moment.utc().hours((objHora.minInt/60)).minutes((objHora.minInt%60)).format("HH:mm");
    let hourFin = moment.utc().hours((objHora.minFin/60)).minutes((objHora.minFin%60)).format("HH:mm");
    if(objHora.dias.length == 1){
        return `${Dias[objHora.dias[0]]} de ${hourInt} hs a ${hourFin}hs`;
    }else{
        //hay coincidencia
        if(objHora.dias.length > 2){
            return `${Dias[objHora.dias[0]]} a ${Dias[objHora.dias[objHora.dias.length - 1]]} de ${hourInt} hs a ${hourFin}hs`;
        }else{
            return `${Dias[objHora.dias[0]]} y ${Dias[objHora.dias[objHora.dias.length - 1]]} de ${hourInt} hs a ${hourFin}hs`;
        }
    }
}

export default (props)=>{
    return(
        <div className="row">
            <div className="col-xs-12 BodyResultBorder">
                <div className="row">
                    <div className="col-xs-6">
                        <h5>{props.label}</h5>
                    </div>
                    <div className="col-xs-6 text-right">
                        <h5 style={{color:props.color}}> Cantidad : {props.result.length}</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 BodyResult">
                        {props.result.map((obj,index)=>{
                            return(
                                <div key={index}>
                                    <p><strong style={{color:props.color}} >-</strong> {textHour(obj)} </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}