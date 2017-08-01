import React from 'react';
import BoxFilter from './BoxFilterV2';

function quitarLosSeleccionador(source, sourceSelect) {
    let arrayLimpio = [...source];
    sourceSelect.forEach((item) => {
        for (let i = 0; i < arrayLimpio.length; i++) {
            if (arrayLimpio[i].value === item.value) {
                //eliminamos ese item y cortamos la iterracion
                arrayLimpio.splice(i, 1);
                break;
            }
        }
    });
    return arrayLimpio;
}

export default (props) => {
    return (
        <div className="row">
            <BoxFilter
                source={quitarLosSeleccionador(props.dataSource, props.store)}
                onSelect={(item) => {
                    //agregamos
                    props.onChange([...props.store, item])
                }}
            />
            <BoxFilter
                source={props.store}
                required={props.required}
                onSelect={(item) => {
                    console.log(item);
                    //removemos
                    props.onChange(props.store.filter(x => x.value !== item.value));
                }}
            />
        </div>
    )
}