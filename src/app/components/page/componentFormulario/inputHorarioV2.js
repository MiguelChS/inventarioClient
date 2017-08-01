import React from 'react';
import {connect} from 'react-redux';
import {addModal} from '../../../actions/modalActionV2';
import DataGrafic from './DataGrafic';
import {verificarGrupoHora} from '../../../lib'

function formatHora(Horas) {
    //obtenemos todos las que tengas alguna hora
    let aux = Horas.filter(x => {
        return (x.hasOwnProperty("hora") && x.hora)
    });
    let hora = {};

    aux.forEach((item) => {
        hora[item.value] = item.hora
    });

    return Object.keys(hora).length ? hora : null;
}

let inputHorario = (props) => {

    let classRequire = '';
    if (props.required && !verificarGrupoHora(props.Horas)) {
        classRequire = "require-inv";
    }
    return (
        <div className="form-group">
            <label
                style={props.hasOwnProperty("style") ? props.style : {}}
                className={`col-xs-12 control-label col-sm-${props.col ? props.col.label : 2}`}>
                {props.label}
            </label>
            <div className={`col-xs-12 col-sm-${props.col ? props.col.input : 10}`}>
                <button type="button"
                        className={`btn ${props.size} btn-white separarButton ${classRequire}`}
                        onClick={() => {
                            props.dispatch(addModal({
                                body: DataGrafic,
                                data: {
                                    id: props.id,
                                    radioConf: props.Horas.map(x => {
                                        return {
                                            label: x.label,
                                            color: x.hasOwnProperty("color") ? x.color : "green",
                                            id: x.value
                                        }
                                    }),
                                    firstDefault: formatHora(props.Horas),
                                    hour24: props.hasOwnProperty("hour24") ? props.hour24 : false,
                                    callbackResult: (value) => {
                                        props.onEndLoad(props.Horas.map(x => {
                                            return {
                                                label: x.label,
                                                value: x.value,
                                                hora: value[x.value]
                                            }
                                        }));
                                    }
                                },
                                size: "xl"
                            }))
                        }}>
                    <i className="fa fa-calendar"/>
                </button>
            </div>
        </div>
    )
};

export default connect()(inputHorario)