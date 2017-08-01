import React from 'react';


export default class BoxFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    filtro() {
        if (this.props.hasOwnProperty("filter") && !this.props.filter) return null;
        return (
            <div className="col-xs-12">
                <input className="filter form-control"
                       type="text"
                       placeholder="Filter"
                       value={this.state.text}
                       onChange={(e) => {
                           this.setState({text: e.target.value})
                       }}
                />
            </div>
        )
    }

    render() {
        return (
            <div className="row">
                {this.filtro()}
                <div className="col-xs-12">
                    <div className="boxFilterPrestacion">
                        {this.props.source.map((item, index) => {
                            return (
                                <div key={index} className="row no-margins">
                                    <div className="col-xs-12">
                                        {this.props.render(item)}
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}