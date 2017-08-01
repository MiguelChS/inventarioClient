import React from 'react';
import PanelControl from './PanelControl/index.jsx';
import Graphic from './Graphic/index.jsx';
import ResultGraphic from './ResultGraphic/index.jsx';
import { connect } from  'react-redux';
import { addDateGrafic,deleteDateGrafic } from '../../actions/dateGraficAction';
import { hiddenModal } from  '../../actions/modalActionV2';

@connect((store)=>{
    return{
        store:store.dateGrafic
    }
})
export default class DateGrafic extends React.Component {
    componentDidMount(){
        if(this.store) return;
        this.props.dispatch(addDateGrafic({
            id:this.props.id,
            radioBtn:this.props.radioConf,
            Hour24:this.props.hour24,
            firstDefault:this.props.firstDefault}))
    }

    cancel(){
        this.props.dispatch(hiddenModal(this.props.idModal))
    }

    endLoad(){
        this.props.result(Object.keys(this.store.matrixGroup).length == 0 ? null: this.store.matrixGroup);
        this.props.dispatch(hiddenModal(this.props.idModal));
    }

    componentWillUnmount(){
        if(this.store){
            this.props.dispatch(deleteDateGrafic({id:this.props.id}))
        }
    }

    validar(){
        if(Object.keys(this.store.matrixGroup).length == 0) return true;
        //verificamos que no supere la cantidad de 10
        for(let attr in this.store.matrixGroup){
            if(!this.store.matrixGroup.hasOwnProperty(attr)) continue;
            let array = this.store.matrixGroup[attr];
            if(array.length > 10){
                return true;
            }
        }
        //verificamos que tiene que ser 24 x 24 el grafico
        if(this.store.Hour24){
            for(let i = 0; i < this.store.matrixHora.length;i++){
                let matrix = this.store.matrixHora;
                let elNull = matrix[i].find(obj=>obj.id_ref == null);
                if(elNull){
                    return true;
                }
            }
        }

        return false;
    }



    render(){
        this.store = this.props.store.find(obj => obj.id == this.props.id);
        if(!this.store) return null;
        this.disabled = this.validar();
        return(
            <div className="container-fluid DateGrafic">
                <PanelControl store={this.store} dispatch={this.props.dispatch}/>
                <div className="hr-line-dashed"/>
                <Graphic store={this.store} dispatch={this.props.dispatch} />
                <div className="hr-line-dashed"/>
                <ResultGraphic store={this.store} dispatch={this.props.dispatch} />
                <div className="row" style={{marginTop:"5px"}}>
                    <div className="text-center col-xs-12">
                        <button type="button" className="btn btn-white separarButton" disabled={this.disabled} onClick={this.endLoad.bind(this)} >
                            Terminar Carga
                        </button>
                        <button type="button" className="btn btn-white separarButton" onClick={this.cancel.bind(this)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
