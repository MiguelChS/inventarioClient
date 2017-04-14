import React from 'react';
import ItemResult from './itemResult.jsx';
import Trim from 'trim';
import { noSelect,filter,select,addAuto,deleteAuto } from '../../actions/autoCompleteAction.js'
import { connect } from  'react-redux';

@connect((store)=>{
    return {
        Store: store.AutoComplete
    }
})
export default class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.hoverOnResult = false;
    }

    selectResult(indice){
        let value = this.props.dataSource[indice].label;
        let store = this.Store;
        this.props.dispatch(select({id:store.id,indice:indice,text:value,objResult:this.props.dataSource[indice]}));
        this.props.resultado(this.props.dataSource[indice]);
        this.hoverOnResult = false;
    }

    filtrarSource(event){
        let store = this.Store;
        let value = Trim(event.target.value);
        let resultado = [];
        let regex = new RegExp(`${value.toUpperCase()}.*`);
        for(let i = 0;i < this.props.dataSource.length ;i++){
            if(regex.test(this.props.dataSource[i].label.toUpperCase())){
                resultado.push(
                    <ItemResult
                        key={i}
                        focus={false}
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
        let store = this.Store;
        let value = Trim(store.text).toUpperCase();
        if(store.indiceSourceSelect == null){
            this.props.dispatch(noSelect({id:store.id,value:""}));
            return;
        }

        if(Trim(this.props.dataSource[store.indiceSourceSelect].label).toUpperCase() != value){
            this.props.dispatch(noSelect({id:store.id,value:""}));
            return;
        }
        this.props.resultado(this.props.dataSource[store.indiceSourceSelect]);
        this.props.dispatch(select({id:store.id,indice:store.indiceSourceSelect,text:store.text,objResult:this.props.dataSource[store.indiceSourceSelect]}));
    }

    onFocus(){
        let store = this.Store;
        let resultado = [];
        let value = store.text;
        let regex = new RegExp(`${value.toUpperCase()}.*`);
        for(let i = 0;i < this.props.dataSource.length ;i++) {
            if(regex.test(this.props.dataSource[i].label.toUpperCase())){
                resultado.push(
                    <ItemResult
                        key={i}
                        focus={false}
                        select={this.selectResult.bind(this)}
                        value={{index:i,label:this.props.dataSource[i].label}}
                    />
                )
            }
        }
        this.props.dispatch(filter({id:store.id,value:resultado,text:store.text}));
    }

    componentDidMount(){
        if(!this.Store){
            if(this.props.firstDefault){
                this.props.dispatch(addAuto(this.props.firstDefault))
            }else{
                this.props.dispatch(addAuto({id:this.props.id}))
            }
        }
    }

    componentWillUnmount(){
        if(this.Store){
            this.props.dispatch(deleteAuto({id:this.props.id}))
        }
    }

    render() {
        this.Store = this.props.Store.find(obj => obj.id == this.props.id);
        if(!this.Store) return null;
        let store = this.Store;
        const styleDiv = {
            position:"relative",
        };
        const styleResul = {
            position:"absolute",
            backgroundColor:"white",
            border:"1px solid #e7eaec",
            width:"100%",
            display: store.showResult,
            zIndex :"10",
            maxHeight:"250px",
            overflowX:"hidden",
            overflowY:"scroll",

        };
        const styleInput = {
            width:"100%"
        };
        const styleConta = {
            position: "absolute",
            right: "2px",
            color: "#7b7b7b",
            fontSize: "10px",
            bottom: "2px"
        };

        let classRequire = "form-control";
        if(this.props.required && store.indiceSourceSelect == null){
            classRequire = "form-control require-inv";
        }
        return (
            <div style={styleDiv}>
                <span style={styleConta}>{this.props.dataSource.length}</span>
                <input type="text" style={styleInput}
                       onChange={this.filtrarSource.bind(this)}
                       onBlur={this.offFocus.bind(this)}
                       value={store.text}
                       className={classRequire}
                       onFocus={this.onFocus.bind(this)}
                />
                <div className="AutoCompleteResult" style={styleResul}
                     onMouseOver={()=>{ this.hoverOnResult = true;}}
                     onMouseOut={()=>{ this.hoverOnResult = false;}}>
                    {store.result}
                </div>
            </div>
        )
    }
}