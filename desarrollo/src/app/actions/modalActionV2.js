/**
 * Created by mc185249 on 7/17/2017.
 */
export function addModal(value) {
    return {
        type:"ADD_MODAL",
        value:value
    }
}
export function hiddenModal(value) {
    return {
        type:"HIDE_MODAL",
        id:value
    }
}