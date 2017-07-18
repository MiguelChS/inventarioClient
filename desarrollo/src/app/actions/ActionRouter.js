/**
 * Created by mc185249 on 5/12/2017.
 */
import React from 'react';
import { changeParentApp , changeChildrenApp} from './appAction';
import PageLayout from '../components/page/Layout';
import MisTicket from '../components/page/MisTicket'

export function PageLayaout(){
    return changeParentApp(<PageLayout/>)
}

export function PageInicio(){
    return changeChildrenApp(<MisTicket/>)
}