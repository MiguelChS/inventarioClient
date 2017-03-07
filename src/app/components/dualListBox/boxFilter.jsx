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
        let total = 0;
        let option = this.props.dataSource.map((value,indice)=>{
            if(value.selected == this.props.selected){
                total++;
                if(value.show){
                    return (<option key={indice} value={indice}>{value.label}</option>)
                }
            }
        });
        let styleRequire = "#919496";
        if(this.props.required && !total){
            styleRequire = "#ed5565";
        }
        return(
            <div className="col-sm-6">
                <div style={{paddingBottom:'5px'}}>
                    <span style={{color:styleRequire}}>Total {total} </span>
                </div>
                <input className="filter form-control" type="text" placeholder="Filter" onChange={this.filtrar.bind(this)}/>
                <div style={{width:"100%"}}>
                    <button type="button" className="btn btn-white btn-boxList" onClick={this.selectAll.bind(this)} >
                        <i className={`glyphicon glyphicon-arrow-${this.props.orientation}`}/>
                        <i className={`glyphicon glyphicon-arrow-${this.props.orientation}`}/>
                    </button>
                </div>
                <select multiple="multiple" className="form-control selectBoxlist" onChange={this.selected.bind(this)}>
                    {option}
                </select>
            </div>
        )
    }
}