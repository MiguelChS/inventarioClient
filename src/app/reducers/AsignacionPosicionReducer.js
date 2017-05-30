let init = {
    prestacion:[],
    Site:null,
    posicion:null,
    siteSource:[],
    siteClientSource:[],
    posicionSource:[],
    newPosicion:null
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_SITE_ASSIGN_POSICION":{
            return {...state,Site:action.value}
        }
        case "INSERT_POSICION_ASSIGN_POSICION":{
            return {...state,posicion:action.value}
        }
        case "INSERT_SOURCE_SITE_ASSIGN_POSICION":{
            return {...state,siteSource:action.value}
        }
        case "INSERT_SOURCE_SITE_CLIENT_ASSIGN_POSICION":{
            return {...state,siteClientSource:action.value}
        }
        case "INSERT_SOURCE_POSICION_ASSIGN_POSICION":{
            return {...state,posicionSource:action.value}
        }
        case "INSERT_INSERT_NEW_POSICION_ASSIGN_POSICION":{
            return {...state,newPosicion:action.value}
        }
        case "INSERT_HORA_PRESTACION_ASSIGN_POSICION":{
            //obtenemos el atriburo {11:[.....]}
            let data = action.value;
            let idVentana = Object.keys(data)[0];
            return {...state,
                prestacion:state.prestacion.map( pre =>{
                    if(pre.value == idVentana){
                        pre["hora"] = data;
                    }
                    return pre;
                })
            }
        }

        case "PRE_CARGAR_HORA_PRESTACION_ASSIGN_POSICION":{
            //tranformar la hora prestacion al formato que nesecita el DataGrid
            let auxPrestacion = action.value.map((obj)=>{
                if(obj.hasOwnProperty("hora")){
                    let hora = {};
                    hora[obj.value] = obj.hora;
                    obj.hora = hora;
                }
                return obj;
            });
            return {...state,prestacion:auxPrestacion}
        }

        case "CLEAN_FORMULARIO_ASSIGN_POSICION":{
            return {...state,...init}
        }
        default:
            return state;
    }
}

export default reducer;