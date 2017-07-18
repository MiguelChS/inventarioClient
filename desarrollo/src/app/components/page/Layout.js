import React from 'react';
import Nav from '../nav/nav.jsx'
import {connect} from  'react-redux';
import Modal from './componentFormulario/modal.jsx';
import ModalV2 from './componentFormulario/modalV2'
class Layout extends React.Component{

    componentDidMount(){
        //eliminaos la imagen del body
        document.getElementsByTagName("body")[0].style.backgroundImage = "none";
        //buscamos los datos source basicos
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
                {this.props.modalV2.map((obj)=>{
                    return <ModalV2 key={obj.id} store={obj} />
                })}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        store: state.app,
        modal:state.modal,
        modalV2:state.modalV2
    }
};

export default connect(mapStateToProps)(Layout)