/**
 * Created by mc185249 on 3/28/2017.
 */
let init = {
    id:null,
    btnPaint:false,
    btnDelete:false,
    radioBtn:[],
    radioSelect:null,
    matrixHora:null,
    diasText:null,
    paint:false,
    Hour24:false,
    matrixGroup:{},
    //flag de req
    maximo:false,
};

function generateMatrix() {
    let matrix = [];
    for(let i = 0;i < 7 ; i++){
        let row = [];
        for(let j =0; j < 48 ; j++ ){
            row.push({
                color:"white",
                row:i,
                col:j,
                id_ref:null
            })
        }
        matrix.push(row)
    }
    return matrix;
}

function generateDayText(type,state) {
    let plus;
    switch (type){
        case 1:{
            plus = state[0].plus;
            return state.map((elem,index)=>{
                if(index >= 1 && index <= 4){
                    elem.show = plus
                }
                if(index == 0) elem.plus = !plus;
                return elem;
            });
        }
        case 2:{
            plus = state[5].plus;
            return state.map((elem,index)=>{
                if(index == 6){
                    elem.show = plus
                }
                if(index == 5) elem.plus = !plus;
                return elem;
            })
        }
        default:{
            return [
                {label:"Lunes",main:true,plus:false,type:1,show:true},
                {label:"Martes",main:false,show:true},
                {label:"Miercoles",main:false,show:true},
                {label:"Jueves",main:false,show:true},
                {label:"Viernes",main:false,show:true},
                {label:"Sabado",main:true,plus:false,type:2,show:true},
                {label:"Domingo",main:false,show:true}
            ]
        }
    }
}

function paintMatrix(matrix,data,row,col,all) {
    if(all){
        switch (row){
            case 0:{
                for(let i = 0; i < 5 ; i++){
                    matrix[i][col].color = data.color;
                    matrix[i][col].id_ref = data.id;
                }
                break;
            }
            case 5:{
                for(let i = 5; i < 7 ; i++){
                    matrix[i][col].color = data.color;
                    matrix[i][col].id_ref = data.id;
                }
                break;
            }
        }
    }else{
        matrix[row][col].color = data.color;
        matrix[row][col].id_ref = data.id;
    }
}

function searchMatches(rowInt,rowFin,colInt,colFin,matrix,id_ref){
    let rowEq = [];
    for(let i = rowInt; i <= rowFin; i++){
        let eq = true;
        //verificamos si los extremos son es igual de tipo de referencia
        if(matrix[i][colInt-1]){
            if(matrix[i][colInt-1].id_ref == id_ref){
                break;
            }
        }
        if(matrix[i][colFin]){
            if(matrix[i][colFin].id_ref == id_ref){
                break;
            }
        }
        for(let j = colInt; j < colFin; j++){
            if(matrix[i][j].id_ref != id_ref){
                eq = false;
                break;
            }
        }
        if(eq){
            rowEq.push(i);
        }else{
            break
        }
    }
    return rowEq;
}

function getHour(dia,diasCoincide,colInt,colFin) {
    return {
        dias:[].concat([dia],diasCoincide),
        minInt: colInt == 0 ? 0 : (colInt * 30),
        minFin: colFin == 0 ? 29 : ((colFin * 30) -1)
    }
}

function getHours(matrix){
    let resulthora = {};
    for(let i = 0; i < 7;i++){
        let auxKey = matrix[i][0].id_ref;
        let colInt = 0;
        let diasCoincide;
        for(let j=0;j <= 48;j++){
            if(j == 48 || auxKey != matrix[i][j].id_ref){
                if(auxKey){
                    if(i == 0){
                        diasCoincide = searchMatches((i + 1),6,colInt,j,matrix,auxKey);
                        if(resulthora.hasOwnProperty(auxKey)){
                            resulthora[auxKey].push(getHour(i,diasCoincide,colInt,j));
                        }
                        else{
                            resulthora[auxKey] = [getHour(i,diasCoincide,colInt,j)];
                        }
                    }else{
                        //verificamos si en la fila antetior hay otro igual
                        let rowAnt = searchMatches((i-1),(i-1),colInt,j,matrix,auxKey);
                        if(rowAnt.length == 0) {
                            diasCoincide = searchMatches((i + 1), 6, colInt, j, matrix, auxKey);
                            if(resulthora.hasOwnProperty(auxKey)){
                                resulthora[auxKey].push(getHour(i,diasCoincide,colInt,j));
                            }
                            else{
                                resulthora[auxKey] = [getHour(i,diasCoincide,colInt,j)];
                            }
                        }
                    }
                }
                auxKey = matrix[i][j] ? matrix[i][j].id_ref : null;
                colInt = j;
            }
        }
    }
    return resulthora;
}

function reducer(state,action) {
    switch (action.type){
        case "ADD_DATEGRAFIC":{
            let NewMatrix = generateMatrix();
            let NewMatrixGroup = {};
            if(action.value.firstDefault){
                NewMatrixGroup = action.value.firstDefault;
                let horas = action.value.firstDefault;
                for(let idHour in horas){
                    if(!horas.hasOwnProperty(idHour)) continue;
                    //obtenemos el color del tipo de horario
                    let color = action.value.radioBtn.find(obj => obj.id == idHour).color;
                    horas[idHour].map((obj)=>{
                        let colInt = (obj.minInt/30);
                        let colFin = ((obj.minFin + 1)/30) - 1;
                        obj.dias.map((diaRow)=>{
                            for(let j=colInt;j<=colFin;j++){
                                paintMatrix(NewMatrix,
                                    {id:idHour,color:color},
                                    diaRow,
                                    j,
                                    false);
                            }
                        });
                    })
                }
            }
            return {...state,matrixHora:[...NewMatrix],diasText:generateDayText(0),matrixGroup:{...NewMatrixGroup},...action.value}
        }

        case "LOAD_DATE_GRAPHIC":{
            return{...state,matrixGroup:{...getHours(state.matrixHora)}}
        }

        case "ACTIVE_BTN_DATE_GRAPHIC":{
            let stateAux = {...state};
            switch (action.value.btn){
                case 1:{
                    stateAux.btnPaint = !stateAux.btnPaint;
                    stateAux.btnDelete = false;
                    break;
                }
                case 2:{
                    stateAux.btnDelete = !stateAux.btnDelete;
                    stateAux.btnPaint = false;
                    break;
                }
            }
            return {...state,...stateAux}
        }

        case "SELECT_RADIO_DATE_GRAPHIC":{
            return {...state,radioSelect:state.radioBtn.find(btn => btn.id == action.value.btnId)}
        }

        case "MINUS_BTN_DATE_GRAPHIC":{
            return {...state,diasText:generateDayText(action.value.type,state.diasText)}
        }

        case "PAINT_BODY_DATE_GRAPHIC":{
            if(state.paint){
                if(!(state.btnPaint && state.radioSelect) && !state.btnDelete) return state;
                let matrix = [...state.matrixHora];
                let color = "white";
                let id = null;
                let all = state.diasText[action.value.row].hasOwnProperty("plus") ? state.diasText[action.value.row].plus : false;
                if(state.btnPaint && state.radioSelect){
                    color = state.radioSelect.color;
                    id = state.radioSelect.id;
                }
                paintMatrix(matrix,
                    {id:id,color:color},
                    action.value.row,
                    action.value.col,
                    all);
                return{...state,matrixHora:[...matrix]}
            }
            return state;
        }

        case "PAINT_ACTIVE_DATE_GRAPHIC":{
            let matrix = [...state.matrixHora];
            if(!state.paint){
                if(state.btnPaint && state.radioSelect){
                    paintMatrix(matrix,
                        {id:state.radioSelect.id,color:state.radioSelect.color},
                        action.value.row,
                        action.value.col,
                        state.diasText[action.value.row].plus);
                    matrix[action.value.row][action.value.col].color = state.radioSelect.color;
                    matrix[action.value.row][action.value.col].id_ref = state.radioSelect.id;
                }
                if(state.btnDelete){
                    paintMatrix(matrix,
                        {id:null,color:"white"},
                        action.value.row,
                        action.value.col,
                        state.diasText[action.value.row].plus);
                }
            }
            return {...state,paint:!state.paint,matrixHora:[...matrix]}
        }

        case "GENERATE_HOUR_DATE_GRAPHIC":{
            //verificar si tiene que estar completo
            //verificar que no halla superado si supero el maximo
            let maximo = false;
            for (let i in state.matrixGroup){
                if(state.matrixGroup[i].length > 10){
                    maximo = true;
                    break;
                }
            }
            return{...state,matrixGroup:{...getHours(state.matrixHora)}}
        }

        default:
            return state;
    }
}

function arrayReducer(state=[],action) {
    switch (action.type){
        case "ADD_DATEGRAFIC":{
            return [...state,reducer(init,action)]
        }
        case "REMOVE_DATEGRAFIC":{
            return state.filter( store => store.id !== action.value.id);
        }
        case "ACTIVE_BTN_DATE_GRAPHIC":{
            return state.map(store =>{
                if(store.id != action.value.id) return store;
                return reducer(store,action);
            })
        }
        case "SELECT_RADIO_DATE_GRAPHIC":{
            return state.map(store =>{
                if(store.id != action.value.id) return store;
                return reducer(store,action);
            })
        }
        case "MINUS_BTN_DATE_GRAPHIC":{
            return state.map(store =>{
                if(store.id != action.value.id) return store;
                return reducer(store,action);
            })
        }
        case "PAINT_BODY_DATE_GRAPHIC":{
            return state.map(store =>{
                if(store.id != action.value.id) return store;
                return reducer(store,action);
            })
        }
        case "PAINT_ACTIVE_DATE_GRAPHIC":{
            return state.map(store =>{
                if(store.id != action.value.id) return store;
                return reducer(store,action);
            })
        }
        case "GENERATE_HOUR_DATE_GRAPHIC":{
            return state.map(store =>{
                if(store.id != action.value.id) return store;
                return reducer(store,action);
            })
        }
        default:
            return state;
    }
}

export default arrayReducer;