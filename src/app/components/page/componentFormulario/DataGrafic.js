import React from 'react';
import DateGrafic from '../../DateGrafic/dateGrafic.jsx';

export default (props) => {
    return (
        <DateGrafic
            id={props.data.id}
            radioConf={props.data.radioConf}
            idModal={props.idModal}
            hour24={props.data.hour24}
            result={props.data.callbackResult}
            firstDefault={props.data.firstDefault}
        />
    )

}