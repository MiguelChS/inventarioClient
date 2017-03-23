import React from 'react';
import {Modal} from 'react-bootstrap';
import AssignPosition from '../equipo/alta/AsignarPosicion.jsx';


export default class ModalForm extends React.Component{

    componenteResult(){
        let store = this.props.store;
        switch (store.body){
            case 1:{
                return <AssignPosition
                    store={this.props.storeAll}
                    dispatch={this.props.dispatch}
                    idModal={store.id}
                    data={store.data}
                />
            }
            default:
                return "";
        }
    }

    render(){
        return(
            <Modal show={true} backdrop="static" dialogClassName="sinBordeModal">
                <Modal.Body>
                    {this.componenteResult()}
                </Modal.Body>
            </Modal>
        )
    }
}