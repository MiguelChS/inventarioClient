/**
 * Created by mc185249 on 3/21/2017.
 */
let init = {
    carga:[],
    estado:[],
    marcas:[],
    planta:[],
    snmp:[],
    so:[],
    xfs:[],
    modelo:[],
    Equipos:[],
    tipoEquipo:[],
    modulos:[],
    site:[],
    position:[],
    gavetas:[],
    tablaStatus:[],
    commandScript:[],
    callingScript:[],
    community:[],
    comunicacion:[],
    slm:[],
    flm:[],
    prestacion:[],
    ubicacionSite:[],
    complete: false
};

function reducer(state=init,action) {
    switch (action.type){
        case "LOAD_SOURCE":{
            return {...state,...action.value,complete:true}
        }

        case "CHANGE_SELECTED_MODULES":{
            return {...state,modulos:{...action.value}}
        }

        case "CHANGE_SHOW_MODULES":{
            let objModulo = {...state.modulos};
            //mostramos todos
            objModulo[action.value.idTipo] = objModulo[action.value.idTipo].map((obj)=> {
                if(action.value.selected == obj.selected){
                    obj.show = 1;
                }
                return obj;
            });
            //escondemos a los que nesecitamos
            let indices = action.value.indice;
            for(let i = 0; i < indices.length;i++){
                objModulo[action.value.idTipo][indices[i]].show = 0;
            }
            return {...state,modulos:{...objModulo}}
        }

        case "CHANGE_MODULE_DEFAULT_ALL":{
            let objModulo = {...state.modulos};
            for(let i in objModulo){
                objModulo[i] = objModulo[i].map((obj)=>{
                    obj.selected = 0;
                    obj.show = 1;
                    return obj;
                })
            }
            return {...state,modulos:{...objModulo}}
        }

        case "CHANGE_MODULE_SELECTED_ALL":{
            return {...state,modulos:{...action.value}}
        }

        case "PRE_LOAD_SOURCE_MODULO":{
            return {...state,modulos:action.value}
        }

        default:
            return state;
    }
}

export default reducer;