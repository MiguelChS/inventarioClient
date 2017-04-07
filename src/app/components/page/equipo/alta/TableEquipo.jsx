import React from 'react';
import { Table } from 'react-bootstrap';
import {connect} from  'react-redux';
import { cargarFormulario,deleteForm } from '../../../../actions/equipoAction.js';
import { changeDefaultModule } from '../../../../actions/sourceAction';
import { loadAuto } from '../../../../actions/autoCompleteAction';
import ButtonTable from './ButtonTable.jsx';
import { addModal } from '../../../../actions/modalAction';


@connect((store)=>{
    return {
        tabla: store.equipo.tabla,
        AutoComplete: store.equipo.autoComplete,
        source: store.source
    }
})
export default class TablaEquipo extends React.Component{

    modificar(data){
        this.props.dispatch(changeDefaultModule());
        this.props.dispatch(cargarFormulario(data,this.props.source))
    }

    asignar(data){
        //cargando los los auto complete
        let autoComp = JSON.parse(localStorage.getItem(data)).AutoComplete;
        let autoSite = autoComp.find(obj => obj.id == "idSite");
        let autoPosi = autoComp.find(obj => obj.id == "idPosicion");
        this.props.dispatch([
            loadAuto({id:"idSite",state:autoSite ? autoSite : {}}),
            loadAuto({id:"idPosicion",state:autoPosi ? autoPosi : {}}),
            addModal({body:1,data:data,size:null})
        ]);
    }

    desAsignar(data){

    }

    deleteForm(data){
        this.props.dispatch(deleteForm(data));
    }

    render(){
        return(
            <Table bsClass="table TableMiddle table-striped table-bordered table-condensed table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Serie</th>
                        <th>Sucursal</th>
                        <th>Posicion</th>
                        <th>Asignado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.tabla.map((obj,indice)=>{
                        let classOK = obj.posicion ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove" ;
                        return(
                            <tr key={indice}>
                                <td>{indice + 1}</td>
                                <td>{obj.numSerie}</td>
                                <td>{obj.nameSuc ? obj.nameSuc : ""}</td>
                                <td>{obj.posicion ? obj.posicion : ""}</td>
                                <td><span className={classOK}/></td>
                                <td>
                                    <ButtonTable
                                        data={obj.idform}
                                        text="asignar"
                                        click={this.asignar.bind(this)}
                                    />
                                    <ButtonTable
                                        data={obj.idform}
                                        icono="fa-pencil"
                                        click={this.modificar.bind(this)}
                                    />
                                    <ButtonTable
                                        data={obj.idform}
                                        icono="fa-list-alt"
                                        click={(data)=>{console.log(data)}}
                                    />
                                    <ButtonTable
                                        data={obj.idform}
                                        icono="fa-trash"
                                        click={this.deleteForm.bind(this)}
                                    />
                                    <ButtonTable
                                        data={obj.idform}
                                        text="Desasignar"
                                        click={this.desAsignar.bind(this)}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

}