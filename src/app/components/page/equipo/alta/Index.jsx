import React from 'react';
import request from '../../../../Request/Request';
import { Row,Col,Button } from 'react-bootstrap';
import Formulario from './Formulario.jsx';
import TableEquipo from './TableEquipo.jsx';
import {connect} from  'react-redux';
import {LoadTablaEA,FinishEA,sendForm,loadStateSendForm} from '../../../../actions/equipoAction.js';
import { searchSource } from '../../../../actions/sourceAction';

@connect((store)=>{
    return {
        source: store.source,
        tabla: store.equipo.tabla,
        ProcessSend: store.equipo.ProcessSend
    }
})
export default class Index extends React.Component{
    componentDidMount(){
        if(!this.props.source.complete){
            this.props.dispatch(searchSource());
        }
        let EA = Object.keys(localStorage).filter( item => /_EA$/.test(item));
        if(EA.length > 0){
            this.props.dispatch(LoadTablaEA());
        }
    }

    componentWillUnmount(){
        let EA = Object.keys(localStorage).filter( item => /_EA$/.test(item));
        if(EA.length > 0){
            /*this.props.dispatch({
                type:"ADD_MODAL",
                title:"",
                body: 2,
                buttonConf:"Aceptar",
                data:{mjs:"¿Desea guardar el trabajo realizado?"}
            })*/
        }
    }

    sendFormReq(form,key){
        return new Promise((resolve, reject)=>{
            let aux = {
                send:true,
                idForm:key
            };
            request.post("http://lnxsrv01:5000/equipo",JSON.stringify(form))
                .then((result)=>{
                    resolve(aux);
                })
                .catch((err)=>{
                    aux.send=false;
                    aux["Error"]= err.response ? err.response.data : err.message;
                    resolve(aux);
                });
        });
    }

    nuevaPosicion(NewPosition){
        let form = NewPosition.dataForm;
        delete form.HoraPrestacion;
        delete form.idEquipo;
        return form;
    }

    finishLoading(){
        if(!this.disabledBtnTerm){
            this.props.dispatch(sendForm(true));
            let EA = Object.keys(localStorage).filter( item => /_EA$/.test(item));
            let ArrayEnvio = [];
            EA.map((key)=>{
                //buscar los datos en el Local Storage
                let auxLocalStorage = JSON.parse(localStorage.getItem(key));
                let formAux = auxLocalStorage.form;
                if(!formAux.sendForm){
                    let form = {
                        "id_tipo_eq": formAux.tipoEquipo.value,
                        "id_tipo_equipo":formAux.Equipos.value,
                        "f_entrega":formAux.fEntrega,
                        "id_estado":formAux.estado.value,
                        "id_institucion": 1,
                        "f_retiro":formAux.fRetiro,
                        "f_inst":formAux.fInstalacion,
                        "f_fin_garantia":formAux.finGarantia,
                        "f_inicio_garantia":formAux.fEntrega,
                        "id_xfs":formAux.xfs ? formAux.xfs.value : null,
                        "id_so":formAux.so.value,
                        "id_snmp":formAux.snmp.value,
                        "id_carga":formAux.carga.value,
                        "modulos_separados_por_coma":formAux.modulos.map( obj => `${obj.value}`),
                        "id_modelo":formAux.modelo.value,
                        "nro_serie":`${formAux.planta.prefijo}-${formAux.nroSerie}`,
                        "id_planta":formAux.planta.value,
                        "id_user":2,
                        "id_equipo_ncr":formAux.equipoNcr,
                        "horaPrestacion":formAux.prestacion,
                        "id_posicion":formAux.position.value == -1 ? null : formAux.position.value,
                        "newPosicion":formAux.position.value == -1 ? this.nuevaPosicion(formAux.position) : null
                    };
                    ArrayEnvio.push(this.sendFormReq(form,key))
                }
            });

            Promise.all(ArrayEnvio)
                .then((result)=>{
                    this.props.dispatch(loadStateSendForm(result));
                })
        }
    }


    render(){
        const style = {
            marginRight:"0",
            marginLeft:"0",
            paddingBottom: "10px",
            borderBottom: "2px solid #e7eaec"
        };
        this.disabledBtnTerm = !(!this.props.ProcessSend && this.props.tabla.length != 0);
        return(
            <Row style={style} bsClass="row wrapperWhite">
                <Col xs={12} bsClass="litleHeader col">
                    <h5> Alta de Equipo </h5>
                </Col>
                <Col xs={12} bsClass="litleBody col">
                    <Formulario/>
                    <div className="hr-line-dashed"/>
                    <TableEquipo />
                    <div className="hr-line-dashed"/>
                    <Button bsClass="btn btn-white"
                            disabled={this.disabledBtnTerm}
                            onClick={this.finishLoading.bind(this)} >
                        Finalizar Carga
                    </Button>
                </Col>
            </Row>
        )
    }
}