/**
 * Created by mc185249 on 3/20/2017.
 */
let init = {
    id:null,
    result:[],
    showResult:"none",
    text: '',
    indiceSourceSelect: null,
    resultSelect:null
};

function reducer(state,action){
    switch (action.type) {
        case "ADD_AUTO":{
            return {...state,...action.value}
        }
        case "NO_SELECT_AUTO":{
            return {...state,...init,text:action.value.value,id:state.id}
        }
        case "RESULT_FILTER_AUTO":{
            return {...state,result:action.value.value,showResult:"block",text:action.value.text}
        }
        case "SELECT_AUTO":{
            return {...state,indiceSourceSelect:action.value.indice,showResult:"none",text:action.value.text,result:[],resultSelect:action.value.objResult}
        }
        case "LOAD_AUTO":{
            return {...state,...init,...action.value.state,id:state.id}
        }
        default:
            return state;
    }
}

function arrayReducer(state=[],action){
    switch (action.type){
        case 'ADD_AUTO':{
            return [...state,reducer(init,action)]
        }

        case 'REMOVE_AUTO':{
            return state.filter( store => store.id !== action.value.id);
        }

        case 'NO_SELECT_AUTO':{
            return state.map((store) => {
               if(store.id != action.value.id) return store;
               return reducer(store,action)
            });
        }
        case 'LOAD_AUTO':{
            return state.map((store) => {
                if(store.id != action.value.id) return store;
                return reducer(store,action)
            });
        }
        case 'RESULT_FILTER_AUTO':{
            return state.map((store) => {
                if(store.id != action.value.id) return store;
                return reducer(store,action)
            });
        }

        case 'SELECT_AUTO':{
            return state.map((store) => {
                if(store.id != action.value.id) return store;
                return reducer(store,action)
            });
        }

        default:
            return state;
    }
}

export default arrayReducer;