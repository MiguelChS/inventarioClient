/**
 * Created by mc185249 on 6/5/2017.
 */
let init = {
    mjsErr:"",
    cliente:null,
    institucion:null,
    site:null,
    equipo:null,
    serie:null,
    siteSource:[],
    pais:null,
    tabla:[]
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_CLIENTE_EQUIPO_MOD":{
            return {...state,cliente:action.value}
        }
        case "INSERT_EQUIPO_EQUIPO_MOD":{
            return {...state,equipo:action.value}
        }
        case "INSERT_INSTITUCION_EQUIPO_MOD":{
            return {...state,institucion:action.value}
        }
        case "INSERT_SITE_EQUIPO_MOD":{
            return {...state,site:action.value}
        }
        case "INSERT_ERR_EQUIPO_MOD":{
            return {...state,mjsErr:action.value}
        }
        case "INSERT_PAIS_EQUIPO_MOD":{
            return {...state,pais:action.value}
        }
        case "INSERT_SERIE_MOD":{
            return {...state,serie:action.value}
        }
        case "INSERT_SOURCE_SITE_EQUIPO_MOD":{
            return {...state,siteSource:action.value}
        }
        case "LOAD_TABLA_EQUIPO_MOD":{
            return {...state,tabla:action.value}
        }

        default:
            return state;
    }
}

export default reducer;