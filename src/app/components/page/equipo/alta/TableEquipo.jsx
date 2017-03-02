import React from 'react';
import { Table,Button} from 'react-bootstrap';

export default class TablaEquipo extends React.Component{
    constructor(){
        super();
        this.state = {
            tbody :[]
        }
    }

    render(){
        return(
            <Table bsClass="table TableMiddle table-striped table-bordered table-condensed table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Serie</th>
                    <th>Asignado</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>20-45785-4545</td>
                    <td><span className="glyphicon glyphicon-ok"/></td>
                    <td>
                        <Button bsClass="btn btn-white" onClick={this.props.openModal.bind(this)}>Asignar</Button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>20-45785-4545</td>
                    <td><span className="glyphicon glyphicon-remove"/></td>
                    <td>
                        <Button bsClass="btn btn-white">Asignar</Button>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>20-45785-4545</td>
                    <td><span className="glyphicon glyphicon-remove"/></td>
                    <td>
                        <Button bsClass="btn btn-white">Asignar</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        )
    }

}