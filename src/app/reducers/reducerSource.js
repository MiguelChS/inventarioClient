/**
 * Created by mc185249 on 3/27/2017.
 */
let init = {


};

function reducer(state = init,action) {
    switch (action.type){
        case "":{
            return {...state}
        }
        default:
            return state;

    }
}

export default reducer