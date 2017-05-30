/**
 * Created by mc185249 on 5/24/2017.
 */
let init = {
    client:null,
    site:null,
    sourceSite:[]
};

function reducer(state = init,action) {
    switch (action.type){
        case "INSERT_CLIENT_MODI_SITE":{
            return {...state,client:action.value}
        }
        case "INSERT_SITE_MODI_SITE":{
            return {...state,site:action.value}
        }
        case "INSERT_SOURCER_SITE_MODI_SITE":{
            return {...state,site:action.value}
        }
        default :{
            return state;
        }
    }
}

export default reducer;