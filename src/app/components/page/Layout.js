import React from 'react';
import Nav from '../nav/nav.jsx'
import {connect} from  'react-redux';
import Modal from './componentFormulario/modal.jsx';
import { PageInicio } from '../../actions/ActionRouter';
import { searchSource } from '../../actions/sourceAction';
import { changeRequestApp } from '../../actions/appAction';

class Layout extends React.Component{

    componentDidMount(){
        //eliminaos la imagen del body
        document.getElementsByTagName("body")[0].style.backgroundImage = "none";
        //buscamos los datos source basicos
         this.props.dispatch([
             changeRequestApp(true),
             searchSource(),
             PageInicio()
         ]);
    }

    componentWillUnmount(){
        //insertamos la imagen
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(http://seantheme.com/color-admin-v2.2/admin/html/assets/img/login-bg/bg-5.jpg)"
    }

    render(){
        return(
            <div>
                <Nav/>
                <div className="wrapper-content">
                    {this.props.store.children}
                </div>
                {this.props.modal.map((obj)=>{
                    return <Modal key={obj.id} storeAll={this.props.store} store={obj} dispatch={this.props.dispatch}/>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        store: state.app,
        modal:state.modal
    }
};

export default connect(mapStateToProps)(Layout)