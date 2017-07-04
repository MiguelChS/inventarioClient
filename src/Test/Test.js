/**
 * Created by mc185249 on 6/21/2017.
 */
function depurar(array, props) {
    var hash = {};
    return array.filter(function(current) {
        if (!current[props]) return false;
        var exists = !hash[current[props]] || false;
        hash[current[props]] = true;
        return exists;
    });
}

function mapearPrestacion(data, source) {
    let prestacionAux = data.prestacion;
    let modulos = data.modulos;
    modulos = depurar(modulos, "idVentana");
    let resultPrestacion = [];
    modulos.forEach((element) => {
        let prestacion = source.TypeHora.find(x => x.value == element.idVentana);
        resultPrestacion.push({
            value: element.idVentana,
            label: prestacion ? prestacion.label : "Prestacion no Encontrada",
            hora: prestacionAux[element.idVentana] ? prestacionAux[element.idVentana] : null
        })
    });
    return resultPrestacion;
}

var moduloTS = [{
        "value": 1,
        "label": "bna",
        "idTipo": 1,
        "selected": 1,
        "show": 1,
        "idVentana": 11
    },
    {
        "value": 2,
        "label": "bna2",
        "idTipo": 1,
        "selected": 1,
        "show": 1,
        "idVentana": 11
    },
    {
        "value": 3,
        "label": "bna3",
        "idTipo": 1,
        "selected": 1,
        "show": 1,
        "idVentana": 11
    },
    {
        "value": 4,
        "label": "coin_dispenser",
        "idTipo": 1,
        "selected": 1,
        "show": 1,
        "idVentana": 12
    }
]
var sourceTS = [{
        "value": 8,
        "label": "ACCESO_HOUR"
    },
    {
        "value": 1,
        "label": "AFTER_HOUR"
    },
    {
        "value": 2,
        "label": "BRANCH_HOUR"
    },
    {
        "value": 6,
        "label": "OFFPEAK_HOUR"
    },
    {
        "value": 3,
        "label": "OPERATION_HOUR"
    },
    {
        "value": 4,
        "label": "OTHER_HOUR"
    },
    {
        "value": 5,
        "label": "PEAK_HOUR"
    },
    {
        "value": 7,
        "label": "SLA_HOUR"
    },
    {
        "value": 9,
        "label": "TX DEPOSITO CHEQUE"
    },
    {
        "value": 10,
        "label": "TX DEPOSITO DE SOBRE"
    },
    {
        "value": 11,
        "label": "TX DEPOSITO DINERO"
    },
    {
        "value": 15,
        "label": "TX DEPOSITO EFECTIVO Y CHEQUE"
    },
    {
        "value": 12,
        "label": "TX EXTRACCION"
    },
    {
        "value": 14,
        "label": "TX EXTRACCION Y DEPOSITO"
    },
    {
        "value": 13,
        "label": "TX OTROS"
    }
]
var PrestacionTS = { "10": [{ "dias": [0], "minFin": 1289, "minInt": 780 }, { "dias": [1], "minFin": 839, "minInt": 780 }, { "dias": [1, 2], "minFin": 1289, "minInt": 1170 }, { "dias": [2, 3], "minFin": 839, "minInt": 780 }, { "dias": [3], "minFin": 1289, "minInt": 1170 }, { "dias": [4], "minFin": 839, "minInt": 780 }, { "dias": [4, 5], "minFin": 1289, "minInt": 1170 }, { "dias": [5], "minFin": 839, "minInt": 780 }, { "dias": [6], "minFin": 1289, "minInt": 1170 }, { "dias": [6], "minFin": 839, "minInt": 780 }], "11": [{ "dias": [1], "minFin": 749, "minInt": 690 }, { "dias": [2], "minFin": 809, "minInt": 300 }], "12": [{ "dias": [1], "minFin": 1019, "minInt": 810 }, { "dias": [2], "minFin": 1019, "minInt": 750 }] }

mapearPrestacion({
    modulos: moduloTS,
    prestacion: PrestacionTS
}, { TypeHora: sourceTS });