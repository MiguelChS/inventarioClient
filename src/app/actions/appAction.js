/**
 * Created by mc185249 on 5/9/2017.
 */
import React from 'react';
import Request from '../Request/Request';
import config from '../config';
import {addModal} from './modalActionV2';
import ModalMensaje from '../components/page/componentFormulario/modalConfirmacion';

import {pageLogin,PageLayaout} from './ActionRouter';

export function changeRequestApp(valor) {
    return {
        type:"CHANGE_REQUEST_APP",
        value: valor
    }
}

export function changeChildrenApp(valor) {
    return {
        type:"CHANGE_CHILDREN_APP",
        value: valor
    }
}

export function changeParentApp(valor) {
    return {
        type:"CHANGE_PARENT_APP",
        value: valor
    }
}

export function insertDataUser(valor) {
    return {
        type:"INSERT_DATA_USER_APP",
        value: valor
    }
}

export function getDataUser() {
    return[
        changeRequestApp(true),
        requestDataUser()
    ]
}

function requestDataUser() {
    return function(dispatch) {
        Request.get(`${config.path}/login`)
            .then((result)=>{
                dispatch([
                    insertDataUser(result.data),
                    changeRequestApp(false),
                    PageLayaout(),
                ]);
            })
            .catch(()=>{
                localStorage.removeItem("token");
                dispatch([
                    pageLogin(),
                    changeRequestApp(false)
                ])
            })
    }
}

export function closeSession() {
    localStorage.removeItem("token");
    return pageLogin();
}

export function modalConfimacion(data) {
    return addModal({
        body: ModalMensaje,
        data: data,
        size: "sm"
    })
}