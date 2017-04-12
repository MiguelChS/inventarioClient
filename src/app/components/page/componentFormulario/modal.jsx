import React from 'react';
import {Modal} from 'react-bootstrap';
import AssignPosition from '../equipo/alta/AsignarPosicion.jsx';
import Formulario from '../posicion/alta/Formulario.jsx';
import DateGrafic from '../../DateGrafic/dateGrafic.jsx';

export default class ModalForm extends React.Component{

    componenteResult(){
        let store = this.props.store;
        switch (store.body){
            case 1:{
                return <AssignPosition
                    idModal={store.id}
                    data={store.data}
                />
            }

            case 2:{
                return <Formulario/>
            }

            case 3:{
                return <DateGrafic
                        id={store.data.id}
                        radioConf={store.data.radioConf}
                        idModal={store.id}
                        hour24={store.data.hour24}
                        />
            }

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