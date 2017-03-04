import React from 'react';
import Trim from 'trim';

export default class BoxFilter extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             btnShowAll:"none"
         }
     }
     filtrar(e){
         if(this.props.dataSource.length == 0) return;
         let value = Trim(e.target.value)+"";
         let regex = new RegExp(`${value.toUpperCase()}.*`);
         let result = [];
         this.props.dataSource.map((value,indice)=>{
             if(!regex.test(value.label.toUpperCase()) && value.selected == this.props.selected){
                 result.push(indice);
             }
         });
         this.props.changeShow({
             idTipo:this.props.dataSource[0].idTipo,
             indice:result,
             selected: this.props.selected
         });
     }

     selected(e) {
         let obj = this.props.dataSource[e.target.value];
         this.props.selectModule({
             value: obj.value,
             idTipo: obj.idTipo,
             show: obj.show,
             selected: this.props.selected ? 0 : 1
         });
     }

     selectAll(){
         if(this.props.dataSource.length == 0) return;
         let obj = this.props.dataSource[0];
        this.props.selectAll({
            idTipo: obj.idTipo,
            selected: this.props.selected ? 0 : 1
        })
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
                    <button type="button" className="btn btn-white btn-boxList" onClick={this.selectAll.bind(this)} >
                        <i className={`glyphicon glyphicon-arrow-${this.props.orientation}`}/>
                        <i className={`glyphicon glyphicon-arrow-${this.props.orientation}`}/>
                    </button>
                </div>
                <select multiple="multiple" className="form-control selectBoxlist">
                    {this.props.dataSource.map((value,indice)=>{
                        if(value.selected == this.props.selected && value.show){
                            return (<option key={indice} value={indice} onClick={this.selected.bind(this)} >{value.label}</option>)
                        }
                    })}
                </select>
            </div>
        )
    }
}