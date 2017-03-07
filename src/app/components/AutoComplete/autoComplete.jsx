import React from 'react';
import ItemResult from './itemResult.jsx';
import Trim from 'trim';
import { connect } from  'react-redux';
import { noSelect,filter,select } from '../../actions/autoCompleteAction.js'

@connect()
export default class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.hoverOnResult = false;
    }

    selectResult(indice){
        let value = this.props.dataSource[indice].label;
        let store = this.props.Store.getState();
        this.props.dispatch(select({id:store.id,indice:indice,text:value}));
        this.props.resultado(this.props.dataSource[indice]);
    }

    filtrarSource(event){
        let store = this.props.Store.getState();
        let value = Trim(event.target.value);
        if(value.length < 2) {
            this.props.dispatch(noSelect({id:store.id,value:value}));
            this.props.resultado(null);
            return;
        }
        let resultado = [];
        let regex = new RegExp(`${value.toUpperCase()}.*`);
        for(let i = 0;i < this.props.dataSource.length ;i++){
            if(regex.test(this.props.dataSource[i].label.toUpperCase())){
                resultado.push(
                    <ItemResult
                        key={i}
                        select={this.selectResult.bind(this)}
                        value={{index:i,label:this.props.dataSource[i].label}}
                    />
                )
            }
        }

        if(resultado.length == 0) {
            this.props.dispatch(noSelect({id:store.id,value:value}));
            this.props.resultado(null);
        }else{
            this.props.dispatch(filter({id:store.id,value:resultado,text:value}));
            this.props.resultado(null);
        }
    }

    offFocus(){
        if(this.hoverOnResult) return;
        let store = this.props.Store.getState();
        let value = Trim(store.text).toUpperCase();
        if(store.indiceSourceSelect == null){
            this.props.dispatch(noSelect({id:store.id,value:""}));
            return;
        }

        if(Trim(this.props.dataSource[store.indiceSourceSelect].label).toUpperCase() != value){
            this.props.dispatch(noSelect({id:store.id,value:""}));
        }
    }

    render() {
        let store = this.props.Store.getState();
        const styleDiv = {
            position:"relative",
        };
        const styleResul = {
            position:"absolute",
            backgroundColor:"white",
            border:"1px solid #e7eaec",
            width:"100%",
            display: store.showResult,
            zIndex :"10"
        };
        const styleInput = {
            width:"100%"
        };

        let classRequire = "form-control";
        if(this.props.required && store.indiceSourceSelect == null){
            classRequire = "form-control require-inv";
        }
        console.log(store);
        return (
            <div style={styleDiv}>
                <input type="text" style={styleInput}
                       onChange={this.filtrarSource.bind(this)}
                       onBlur={this.offFocus.bind(this)}
                       value={store.text}
                       className={classRequire} />
                <div style={styleResul}
                     ref="result"
                     onMouseOver={()=>{ this.hoverOnResult = true;}}
                     onMouseOut={()=>{ this.hoverOnResult = false;}}>
                    {store.result}
                </div>
            </div>
        )
    }
}