import React from 'react';
function Horas() {
    let ArrayHora = [];
    for(let i =0; i < 24;i++){
        ArrayHora.push(<div key={i} className="cuboHoraHead text-center">{i}</div>)
    }
    return ArrayHora;
}
export default ()=>{
    return(
        <div className="col-xs-12">
            <div className="row">
                <div className="col-xs-12 col-sm-1">
                    <div className="horaHeadText">
                        Lunes
                    </div>
                </div>
                <div className="col-xs-12 col-sm-11">
                    {Horas()}
                </div>
            </div>
        </div>
    )
}