import React from 'react';
import {Modal} from 'react-bootstrap';

export default class ModalForm extends React.Component{

    componenteResult(){
        let store = this.props.store;
        switch (store.body){
            /*case 1:{
                return <AssignPosition
                    idModal={store.id}
                    data={store.data}
                />
            }*/
            default:
                return "";
        }
    }

    render(){
        let size = null;
        let classXl = "";
        if(this.props.store.size == "xl"){
            classXl = "modal-xl modal-lg"
        }else{
            size = this.props.store.size;
        }
        return(
            <Modal show={true}
                   backdrop="static"
                   dialogClassName={`sinBordeModal ${classXl}`}
                   bsSize={size}
            >
                <Modal.Body>
                    {this.componenteResult()}
                </Modal.Body>
            </Modal>
        )
    }
}