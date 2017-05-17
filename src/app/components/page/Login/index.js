/**
 * Created by mc185249 on 5/12/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../../actions/LoginAction';
import { changeRequestApp } from '../../../actions/appAction'

let Login = (props)=>{
    return(
        <div className="container-fluid login">
            <div className="row">
                <div className="col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4 loginHeader">
                    <div className="brand">
                        <span className="logo"/>
                        Inventario
                        <small>Gestion de inventario</small>
                    </div>
                    <div className="icon">
                        <i className="fa fa-sign-in"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4 login-v2">
                    <div className="login-content">
                        <form className="margin-bottom-0"
                            onSubmit={(event)=>{
                                event.preventDefault();
                                if(!validar(props.store)) return;
                                props.dispatch([
                                    changeRequestApp(true),
                                    action.sendFormulario(props.store)
                                ])
                            }}
                            >
                            <p style={{color:"rgb(255, 116, 116)",textAlign:"center"}}>{props.store.mjsErr}</p>
                            <div className="form-group m-b-20">
                                <input type="text"
                                       className="form-control input-lg"
                                       placeholder="Email Address"
                                       value={props.store.usuario}
                                       onChange={(event)=>{
                                            props.dispatch(action.insertUsuario(event.target.value))
                                       }}
                                />
                            </div>
                            <div className="form-group m-b-20">
                                <input type="password"
                                       className="form-control input-lg"
                                       placeholder="Password"
                                       value={props.store.pass}
                                       onChange={(event)=>{
                                           props.dispatch(action.insertPass(event.target.value))
                                       }}
                                       />
                            </div>
                            <div className="login-buttons">
                                <button type="submit"
                                        disabled={props.Request}
                                        className="btn btn-success btn-block btn-lg">
                                    Sign me in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

function validar(form) {
    return (form.usuario && form.pass);
}

const mapStateToProps =(state)=>{
    return{
        store:state.login,
        Request:state.app.Request
    }
};

export default connect(mapStateToProps)(Login);