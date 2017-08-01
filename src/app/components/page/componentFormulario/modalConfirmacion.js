import React from 'react';
import {connect} from 'react-redux';
import {hiddenModal} from '../../../actions/modalActionV2';

let modalMessage = (props) => {
    return (
        <div className="row">
            <div className="col-xs-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
                <h5>{props.data.mensaje}</h5>
            </div>
            <div className="col-xs-12 text-right">
                <button className="btn btn-white separarButton"
                        onClick={() => {
                            if (props.data.hasOwnProperty("hidenAcepte")) {
                                props.dispatch(hiddenModal(props.idModal))
                            } else {
                                props.data.onAcepte(props.idModal)
                            }
                        }}
                        disabled={props.request}
                        type="button">
                    Aceptar
                </button>
                {(() => {
                    if (props.data.hasOwnProperty("onCancele")) {
                        return (
                            <button className="btn btn-white separarButton"
                                    disabled={props.request}
                                    onClick={() => {
                                        props.dispatch(hiddenModal(props.idModal))
                                    }}
                                    type="button">
                                Cancelar
                            </button>
                        )
                    } else {
                        return null;
                    }
                })()}
            </div>
        </div>
    )
};
export default connect(state => {
    return {
        request: state.app.Request
    }
})(modalMessage);