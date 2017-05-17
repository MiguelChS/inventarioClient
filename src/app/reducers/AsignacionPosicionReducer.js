let init = {
    horaPrestacion:[],
    tiposPrestaciones:[],
    Site:null,
    SiteClient:null,
    posicion:null,
    siteSource:[],
    siteClientSource:[],
    posicionSource:[]
};

function reducer(state=init,action) {
    switch (action.type){
        case "INSERT_SITE_ASSIGN_POSICION":{
            return {...state,Site:action.value}
        }
        case "INSERT_SITE_CLIENT_ASSIGN_POSICION":{
            return {...state,SiteClient:action.value}
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
        case "INSERT_HORA_PRESTACION_ASSIGN_POSICION":{
            let data = action.value;
            let HorasPrestacion = [...state.horaPrestacion];
            let auxPres = HorasPrestacion.find(obj => obj.idHora == data.idHora);
            if(auxPres){
                if(data.hora){
                    //update
                    HorasPrestacion = HorasPrestacion.map(obj=>{
                        if(obj.idHora == data.idHora){
                            obj.hora = data.hora;
                        }
                        return obj;
                    });
                }else{
                    //remove
                    HorasPrestacion = HorasPrestacion.filter(fil=>fil.idHora != data.idHora);
                }
            }else{
                //insert
                HorasPrestacion = [...HorasPrestacion,data];
            }
            return {...state,horaPrestacion:HorasPrestacion}
        }
        case "INSERT_TIPO_PRESTACIONES_ASSIGN_POSICION":{
            return {...state,tiposPrestaciones:action.value}
        }
        default:
            return state;
    }
}

export default reducer;