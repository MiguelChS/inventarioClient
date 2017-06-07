import React from 'react';
import {Modal} from 'react-bootstrap';
import AssignPosition from '../equipo/alta/AsignarPosicion.jsx';
import ModalFormPosicion from '../posicion/alta/ModalAltaPosicion';
import DateGrafic from '../../DateGrafic/dateGrafic.jsx';
import ModalFormularioSite from '../site/Component/FormularioSite';
import ModalFormularioEquipo from '../equipo/modificacion/ModalEdit';

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
                return <ModalFormPosicion
                    idModal={store.id}
                    data={store.data}
                />
            }

            case 3:{
                return <DateGrafic
                        id={store.data.id}
                        radioConf={store.data.radioConf}
                        idModal={store.id}
                        hour24={store.data.hour24}
                        result={store.data.callbackResult}
                        firstDefault={store.data.firstDefault}
                        />
            }

            case 4:{
                return <ModalFormularioSite
                    idModal={store.id}
                    data={store.data}
                />
            }

            case 5:{
               return <ModalFormularioEquipo
                   idModal={store.id}
                   data={store.data}
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