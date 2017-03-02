import React from 'react';
import Trim from 'trim';

export default class BoxFilter extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             btnShowAll:"none",
             resultFiltro: this.props.dataSource.map((item,index)=>(<option key={index} value={index} onClick={this.selected.bind(this)}>{item.label}</option>))
         }
     }
     filtrar(e){
         let value = Trim(e.target.value)+"";
         let regex = new RegExp(`${value.toUpperCase()}.*`);
         let result = this.props.dataSource.map((value,indice)=>{
             if(regex.test(value.label.toUpperCase())){
                 return (<option key={indice} value={indice} onClick={this.selected.bind(this)} >{value.label}</option>)
             }
         });
         this.setState({resultFiltro:result});
     }
     selected(e){
         let result = [e.target.value];
         this.props.pasarValor(result);
     }

    render(){
        return(
            <div className="col-sm-6">
                <div style={{paddingBottom:'5px'}}>
                    <span style={{color:"#919496"}}>Showing all 12</span>
                    <button type="button" className="btn pull-right btn-white btn-xs" style={{display:this.state.btnShowAll}}>show all</button>
                </div>
                <input className="filter form-control" type="text" placeholder="Filter" onChange={this.filtrar.bind(this)}/>
                <div style={{width:"100%"}}>
                    <button type="button" className="btn btn-white btn-boxList" >
                        <i className={`glyphicon glyphicon-arrow-${this.props.orientation}`}/>
                        <i className={`glyphicon glyphicon-arrow-${this.props.orientation}`}/>
                    </button>
                </div>
                <select multiple="multiple" className="form-control selectBoxlist">
                    {this.state.resultFiltro}
                </select>
            </div>
        )
    }
}