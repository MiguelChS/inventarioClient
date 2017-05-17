/**
 * Created by mc185249 on 5/16/2017.
 */
import React from 'react';
import ItemResult from './itemResult.jsx';
import Trim from 'trim';

export default class AutoComplete extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            show:"none",
            result:[]
        }
    }

    selectResult(indice){
        //limpiar el resultado y esconde el div result
        this.setState({result:[],show:"none"});
        //enviamos el resultado encontrado
        this.props.onChange(this.props.dataSource[indice]);
        //cambiamos el estado del hoveer
        this.hoverOnResult = false;
    }

    buscarCoincidencia(regex){
        let newResult = [];
        for(let i = 0;i < this.props.dataSource.length ;i++){
            if(regex.test(this.props.dataSource[i].label.toUpperCase())){
                newResult.push(
                    <ItemResult
                        key={i}
                        focus={false}
                        select={this.selectResult.bind(this)}
                        value={{index:i,label:this.props.dataSource[i].label}}
                    />
                )
            }
        }
        return newResult;
    }

    filtrarSource(event){
        //obtenemos el texto
        let text = event.target.value;
        //armamos la expresion regular
        let regex = new RegExp(`${text.toUpperCase()}.*`);
        //buscamos las coincidencias
        let resultado = this.buscarCoincidencia(regex);
        //verificamos el resultado
        if(!resultado.length) {
            //si es vacio insertamso el resultado vacio cagamos el vacio y escondemos el div resultado
            this.setState({result:resultado,show:"none"});
        }else{
            //insertamos el resultado de la busqueda y mostramos el div resultado
            this.setState({result:resultado,show:"block"});
        }
        this.props.onChange({
            label:text,
            value:null
        })
    }

    offFocus(event){
        if(this.hoverOnResult) return;
        let text = event.target.value;
        //buscamos si el texto encontrado existe en el data dource
        let dato = this.props.dataSource.find(obj => Trim(obj.label) == Trim(text));
        this.setState({result:[],show:"none"});
        if(dato){
            this.props.onChange(dato);
        }else{
            this.props.onChange(null);
        }
    }

    render(){
        const styleResul = {
            position:"absolute",
            backgroundColor:"white",
            border:"1px solid #e7eaec",
            width:"100%",
            display: this.state.show,
            zIndex :"10",
            maxHeight:"250px",
            overflowX:"hidden",
            overflowY:"scroll",

        };
        let store = this.props.store ? this.props.store : {label:"",value:null};
        let classRequire = "form-control";
        if(this.props.required && store.value == null){
            classRequire = "form-control require-inv";
        }
        return(
            <div style={styleDiv}>
                <span style={styleConta}>{this.props.dataSource.length}</span>
                <input type="text" style={styleInput}
                       onChange={this.filtrarSource.bind(this)}
                       onFocus={this.filtrarSource.bind(this)}
                       onBlur={this.offFocus.bind(this)}
                       value={store.label}
                       className={classRequire}
                       disabled={this.props.disabled}
                />
                <div className="AutoCompleteResult" style={styleResul}
                     onMouseOver={()=>{ this.hoverOnResult = true;}}
                     onMouseOut={()=>{ this.hoverOnResult = false;}}>
                    {this.state.result}
                </div>
            </div>
        )
    }

}

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
const styleDiv = {
    position:"relative",
};