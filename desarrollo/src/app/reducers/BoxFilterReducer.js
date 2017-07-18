/**
 * Created by mc185249 on 4/17/2017.
 */
let init = {
    result:[]
};

function reducer(state = init,action) {
    switch (action.type){
        case "LOAD_RESULT_BOX_FILTER":{
            return {...state,result:action.value}
        }
        case "LOAD_HORA_BOX_FILTER":{
            return {...state,result:state.result.map((obj)=>{
                if(obj.data.value == action.value.id){
                    obj.hora = action.value.hora;
                    if(!action.value.hora){
                        obj.selected = false;
                    }
                }
                return obj;
            })}
        }
        case "CHECKED_BOX_FILTER":{
            return{...state,result:state.result.map((obj)=>{
                if(obj.data.value == action.value.id){
                    obj.selected = !obj.selected;
                }
                return obj;
            })}
        }
        default:{
            return state;
        }
    }

}

export default reducer;
