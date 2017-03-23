/**
 * Created by mc185249 on 3/23/2017.
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