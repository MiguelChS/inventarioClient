import React from 'react';
import {Modal,Button} from 'react-bootstrap';

export default class ModalForm extends React.Component{
    constructor(){
        super();
        this.state={
            showModal:false
        }
    }

    close() {
        this.setState({ showModal: false });
    }

    render(){
        return(
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close.bind(this)}>close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}