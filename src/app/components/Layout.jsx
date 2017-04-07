import React from 'react';
import Nav from './nav/nav.jsx'
import {connect} from  'react-redux';
import Modal from './page/componentFormulario/modal.jsx';
import {addAuto} from '../actions/autoCompleteAction';
import { searchSource } from '../actions/sourceAction';

@connect((store)=>{
    return {
        modal:store.modal,
        store:store,
        source:store.source
    }
})
export default class Layout extends React.Component{

    componentDidMount(){
        this.props.dispatch([
            addAuto({id:"idPlanta"}),
            addAuto({id:"idModelo"}),
            addAuto({id:"idSite"}),
            addAuto({id:"idPosicion"}),
            searchSource()
        ]);
    }

    render(){
        return(
            <div>
                <Nav/>
                <div className="wrapper-content">
                    {this.props.children}
                </div>
                {this.props.modal.map((obj)=>{
                    return <Modal key={obj.id} storeAll={this.props.store} store={obj} dispatch={this.props.dispatch}/>
                })}
            </div>
        );
    }
}