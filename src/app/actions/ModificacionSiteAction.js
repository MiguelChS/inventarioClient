/**
 * Created by mc185249 on 5/24/2017.
 */
import Request from '../Request/Request';
import { changeRequestApp } from './appAction';

export function insertClient(valor) {
    let action = {
        type: "INSERT_CLIENT_MODI_SITE",
        value: valor
    };
    if(!valor || !valor.value){
        return[
            action,
            insertSite(null),
            insertSourceSite([])
        ]
    }

    return[
        action,
        changeRequestApp(true),
        insertSite(null),
        insertSourceSite([]),
        getSite(valor)
    ];
}
export function insertSite(valor) {
    return {
        type:"INSERT_SITE_MODI_SITE",
        value:valor
    }
}
export function insertSourceSite(valor) {
    return {
        type:"INSERT_SOURCER_SITE_MODI_SITE",
        value:valor
    }
}
export function getSite(data) {
    return function(dispatch) {
        Request.get(`http://localhost:4000/api/site/${data.value}/${data.origen}`)
            .then((result)=>{
                dispatch([
                    insertSourceSite(result.data),
                    changeRequestApp(false)
                ]);
            })
            .catch((err)=>{
                dispatch([
                    changeRequestApp(false)
                ])
            });
    }
}