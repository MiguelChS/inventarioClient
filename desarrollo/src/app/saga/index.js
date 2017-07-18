/**
 * Created by mc185249 on 7/5/2017.
 */
import { takeEvery } from 'redux-saga';
import * as request from './allRequest';

function* login() {
    yield takeEvery('',request.logearse)
}

export default function* rootSaga() {
    yield [
        login()
    ]
}