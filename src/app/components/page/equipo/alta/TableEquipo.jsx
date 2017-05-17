import React from 'react';
import { Table } from 'react-bootstrap';
import {connect} from  'react-redux';
import { preCargarFormulario,deleteForm ,desAssign} from '../../../../actions/equipoAction.js';
import { changeDefaultModule } from '../../../../actions/sourceAction';
import ButtonTable from './ButtonTable.jsx';
import { addModal } from '../../../../actions/modalAction';


@connect((store)=>{
    return {
        tabla: store.equipo.tabla,
        source: store.source
    }
})
export default class TablaEquipo extends React.Component{

    modificar(data){
        this.props.dispatch(changeDefaultModule());
        this.props.dispatch(preCargarFormulario(data,this.props.source))
    }

    asignar(data){
        this.props.dispatch(addModal({body:1,data:data,size:null}));
    }

    desAsignar(data){
        this.props.dispatch(desAssign(data))
    }

    deleteForm(data){
        this.props.dispatch(deleteForm(data));
    }

    showErrEnvio(mjs){
        console.log(mjs);
    }

    returnBtnErr(err){
        if(!err) return null;
        return <ButtonTable
            data={err}
            icono="fa-exclamation-triangle"
            click={this.showErrEnvio.bind(this)}
        />
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
                        <th>Enviado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.tabla.map((obj,indice)=>{
                        let classOK = obj.posicion != 'SIN DATO' ? "glyphicon glyphicon-ok text-center" : "glyphicon glyphicon-remove text-center" ;
                        let envioOk = obj.sendForm ? "glyphicon glyphicon-ok text-center" : "glyphicon glyphicon-remove text-center";
                        return(
                            <tr key={indice}>
                                <td>{indice + 1}</td>
                                <td>{obj.numSerie}</td>
                                <td>{obj.nameSuc ? obj.nameSuc : ""}</td>
                                <td>{obj.posicion ? obj.posicion : ""}</td>
                                <td><span className={classOK}/></td>
                                <td>
                                    <span className={envioOk} style={{verticalAlign:"middle",marginRight:"10px"}}/>
                                    {this.returnBtnErr(obj.err)}
                                </td>
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