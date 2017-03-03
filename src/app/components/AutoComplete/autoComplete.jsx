import React from 'react';
import ItemResult from './itemResult.jsx';
import Trim from 'trim';

export default class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        let defaultSelect = {
            text:'',
            indiceSourceSelect: null
        };
        if(this.props.default){
            this.searchDefault(defaultSelect,this.props.default)
        }
        this.state = {
            result:[],
            showResult:"none",
            text: defaultSelect.text,
            indiceSourceSelect:defaultSelect.indiceSourceSelect
        };
        this.hoverOnResult = false;
    }

    searchDefault(defaultSelect,idValue){
        for(let i = 0;i < this.props.dataSource.length ;i++){
            if(this.props.dataSource[i].value == idValue){
                defaultSelect.text = this.props.dataSource[i].label;
                defaultSelect.indiceSourceSelect = i;
                return;
            }
        }
    }

    selectResult(indice){
        let value = this.props.dataSource[indice].label;
        this.setState({
            indiceSourceSelect:indice,
            showResult:"none",
            text:value},()=>{
            this.props.resultado(this.props.dataSource[indice]);
        });
    }

    filtrarSource(event){
        let value = Trim(event.target.value);
        if(value.length < 2) {
            this.setState({
                showResult:"none",
                indiceSourceSelect: null,
                text:value},
                ()=>{
                    this.props.resultado(null)
                });
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
        console.log("data source -->>",this.props.dataSource,"--->",resultado);
        if(resultado.length == 0) {
            this.setState({
                    showResult:"none",
                    indiceSourceSelect:null,
                    text:value},
                ()=>{
                    this.props.resultado(null);
                });
        }else{
            this.setState({
                    result:resultado,
                    showResult:"block",
                    indiceSourceSelect:null,
                    text:value},
                ()=>{
                    this.props.resultado(null);
                });
        }
    }

    offFocus(){
        if(this.hoverOnResult) return;
        let value = Trim(this.state.text).toUpperCase();
        if(this.state.indiceSourceSelect == null){
            this.setState({showResult:"none",text:""});
            return;
        }

        if(Trim(this.props.dataSource[this.state.indiceSourceSelect].label).toUpperCase() != value){
            this.setState({indiceSourceSelect:null,showResult:"none",text:""});
        }

        this.setState({showResult:"none"});
    }

    render() {
        const styleDiv = {
            position:"relative",
        };
        const styleResul = {
            position:"absolute",
            backgroundColor:"white",
            border:"1px solid #e7eaec",
            width:"100%",
            display: this.state.showResult,
            zIndex :"10"
        };
        const styleInput = {
            width:"100%"
        };

        return (
            <div style={styleDiv}>
                <input type="text" style={styleInput}
                       onChange={this.filtrarSource.bind(this)}
                       onBlur={this.offFocus.bind(this)}
                       value={this.state.text}
                       className="form-control" />
                <div style={styleResul}
                     ref="result"
                     onMouseOver={()=>{ this.hoverOnResult = true;}}
                     onMouseOut={()=>{ this.hoverOnResult = false;}}>
                    {this.state.result}
                </div>
            </div>
        )
    }
}