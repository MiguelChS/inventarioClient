import React from 'react';

export default class BoxFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    drawOption() {
        let arrayAux = [...this.props.source];
        if (this.state.text) {
            let regex = new RegExp(`${this.state.text.toUpperCase()}.*`);
            arrayAux = arrayAux.filter(x => regex.test(x.label.toUpperCase()))
        }

        return arrayAux.map((item, index) => {
            return (
                <option key={index} value={item.value}>
                    {item.label}
                </option>
            )
        })
    }


    render() {
        let requerido = "";
        if (this.props.required && this.props.source.length === 0) {
            requerido = "mjsErr";
        }

        return (
            <div className="col-sm-6">
                <div style={{paddingBottom: '5px'}}>
                    <span className={requerido}> Total {this.props.source.length}</span>
                </div>
                <input className="filter form-control"
                       type="text"
                       placeholder="Filter"
                       value={this.state.text}
                       onChange={(e) => {
                           this.setState({text: e.target.value})
                       }}
                />
                <select multiple="multiple"
                        className="form-control selectBoxlist"
                        onClick={(e) => {
                            this.props.onSelect(this.props.source.find(x => x.value === parseInt(e.target.value, 10)))
                        }}
                >
                    {this.drawOption()}
                </select>
            </div>
        )
    }
}