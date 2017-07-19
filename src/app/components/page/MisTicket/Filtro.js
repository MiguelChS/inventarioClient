import React from 'react';
import {connect} from 'react-redux';
import {Ibox,Select,AutoComplete} from '../componentFormulario';
import { getInicidente } from '../../../actions/MisTicketAction';

class Filtro extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Ibox Title="Filtro">
                <form className="form-horizontal" onSubmit={(event)=>{
                    event.preventDefault();
                    this.props.dispatch(getInicidente());
                }}>
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <p className="mjsErr">{}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <Select label="Equipo" id="idEquipo"
                                    dataSource={[]}
                                    default={null}
                                    disabled={this.props.request}
                                    returnSelect={(value)=>{

                                    }}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <AutoComplete
                                label="Cliente"
                                col={{label:2,input:10}}
                                store={null}
                                dataSource={[]}
                                disabled={this.props.request}
                                onChange={(value)=>{

                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <div className="btn-group">
                                <button className="btn btn-sm btn-white separarButton"
                                        disabled={this.props.request}
                                        type="submit">
                                    Filtrar
                                    <i style={{marginLeft:"5px"}} className="fa fa-filter"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Ibox>
            )
    }

}

export default connect(state => {
    return {
        request:state.app.Request,
        source:state.source
    }
})(Filtro);
