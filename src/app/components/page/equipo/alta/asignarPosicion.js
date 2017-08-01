import React from 'react';
import {connect} from 'react-redux';
import {IboxModal, AutoComplete, BoxFilter, InputHorarioV2} from '../../componentFormulario';
import {getSite, getPosicion} from '../../../../actions/sourceAction';
import {preLoadFormulario} from '../../../../actions/PosicionAction';
import {hiddenModal, addModal} from '../../../../actions/modalActionV2';
import {VerificarPrestacion} from '../../../../lib';
import FormularioPosicion from '../../posicion/alta/ModalPosicion';

class asignarPosicion extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.data;
        //lo formateamos
        let prestacion = data.prestacion.map(x => {
            let aux = this.props.source.TypeHora.find(z => z.value === x.idHora);
            if (!aux) return null;
            //verificar si existe hora
            if (x.hasOwnProperty("hora") && x.hora) {
                aux = {...aux, ...{hora: x.hora}}
            }
            return {...aux}
        });
        //limpiamos el que no se encontro
        prestacion = prestacion.filter(x => x);
        this.state = {
            site: data.site.value ? data.site : null,
            posicion: data.posicion.value ? data.posicion : null,
            prestacion: prestacion
        }
    }

    componentDidMount() {
        this.props.dispatch(getSite(this.props.data.cliente.value))
    }

    prestacionComponent() {
        return (
            <BoxFilter
                source={this.state.prestacion}
                filter={false}
                render={(data) => {
                    return (
                        <InputHorarioV2
                            id={data.value}
                            Horas={[data]}
                            label={data.label}
                            size="btn-xs"
                            required={true}
                            col={{label: 10, input: 2}}
                            style={{fontWeight: "100", textAlign: "left", paddingTop: "2px"}}
                            onEndLoad={(horas) => {
                                this.setState({
                                    prestacion: this.state.prestacion.map(x => {
                                        if (x.value !== horas[0].value) return x;
                                        return horas[0]
                                    })
                                })
                            }}
                        />
                    )
                }}
            />
        )
    }

    completo() {
        return (this.state.site && this.state.site.value) && (this.state.posicion && this.state.posicion.value) && VerificarPrestacion(this.state.prestacion)
    }

    render() {
        return (
            <IboxModal Title="Asignar Posicion">
                <form className="form-horizontal">
                    <div className="row">
                        <div className="col-xs-12">
                            <AutoComplete
                                label="Site"
                                dataSource={this.props.source.site}
                                store={this.state.site}
                                col={{input: 9, label: 3}}
                                required={true}
                                disabled={this.props.request}
                                onChange={(value) => {
                                    if (value && value.value) {
                                        this.props.dispatch(getPosicion(value.value))
                                    }
                                    this.setState({site: value, posicion: null});
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <AutoComplete
                                label="Posicion"
                                col={{input: 9, label: 3}}
                                dataSource={this.props.source.posicion}
                                disabled={(this.props.request)}
                                store={this.state.posicion}
                                required={true}
                                onChange={(value) => {
                                    this.setState({posicion: value});
                                }}
                            />
                        </div>
                    </div>
                    {this.prestacionComponent()}
                    <div className="row">
                        <div className="col-xs-12 text-right">
                            <div className="btn-group separarButton">
                                <button type="button"
                                        disabled={(this.props.request || !(this.state.site && this.state.site.value))}
                                        onClick={() => {
                                            this.props.dispatch([
                                                addModal({
                                                    body: FormularioPosicion,
                                                    size: "xl",
                                                    data: {
                                                        desdeEquipo: true,
                                                        btnAcepted: "Agregar Posicion"
                                                    }
                                                }),
                                                preLoadFormulario({
                                                    cliente: this.props.data.cliente,
                                                    site: this.state.site
                                                })
                                            ])
                                        }} className="btn btn-white">
                                    Nueva Posicion
                                </button>
                            </div>
                            <div className="btn-group separarButton">
                                <button type="button"
                                        disabled={this.props.request || !this.completo()}
                                        onClick={() => {
                                            this.props.data.onLoad({
                                                site: this.state.site,
                                                idform: this.props.data.idform,
                                                posicion: this.state.posicion,
                                                prestacion: this.state.prestacion.map(x => {
                                                    return {
                                                        idHora: x.value,
                                                        hora: x.hora
                                                    }
                                                })
                                            });
                                            this.props.dispatch(this.props.dispatch(hiddenModal(this.props.idModal)));
                                        }}
                                        className="btn btn-white">
                                    Asignar
                                </button>
                            </div>
                            <div className="btn-group separarButton">
                                <button type="button" disabled={this.props.request} onClick={() => {
                                    this.props.dispatch(hiddenModal(this.props.idModal))
                                }}
                                        className="btn btn-white">
                                    cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </IboxModal>
        )
    }
}

export default connect((state) => {
    return {
        request: state.app.Request,
        source: state.source
    }
})(asignarPosicion)