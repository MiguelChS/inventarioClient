let init = {
    body:null,
    id:null,
    data:null,
    size:null
};

function reducer(state=init,action){
    switch (action.type) {
        case "ADD_MODAL":{
           return {...state,body:action.value.body,id:Date.now(),data:action.value.data,size:action.value.size}
        }
        default:
            return state;
    }
}

function arrayReducer(state=[],action){
    switch (action.type){
        case 'ADD_MODAL':{
            return [...state,reducer(init,action)]
        }
        case 'HIDE_MODAL':{
            return state.filter( store => store.id !== action.id)
        }
        default:
            return state;
    }
}

export default arrayReducer;