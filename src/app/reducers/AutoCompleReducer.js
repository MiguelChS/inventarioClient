/**
 * Created by mc185249 on 3/7/2017.
 */
import {createStore} from 'redux';
let init = {
    id:null,
    result:[],
    showResult:"none",
    text: '',
    indiceSourceSelect: null
};

function reducer(state=init,action){
    switch (action.type) {
        case "NO_SELECT_AUTO":{
            return {...state,...init,text:action.value,id:state.id}
        }
        case "RESULT_FILTER_AUTO":{
            return {...state,result:action.value.value,showResult:"block",text:action.value.text}
        }
        case "SELECT_AUTO":{
            return {...state,indiceSourceSelect:action.value.indice,showResult:"none",text:action.value.text,result:[]}
        }
        default:
            return state;
    }
}

export default function reducerAutoComplete(initObj){
    let mageInit = {...init,...initObj};
    return createStore(reducer,mageInit)
}