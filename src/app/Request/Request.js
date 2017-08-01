/**
 * Created by mc185249 on 3/2/2017.
 */
import axios from 'axios';



export default {
    get:(url)=>{
            return axios({
                method:'get',
                url:url,
                headers: {
                    'Content-Type': "application/json",
                    'Authorization':localStorage.getItem("token")
                }
            })
    },
    post:(url,param) =>{
        return axios({
            method:'post',
            url:url,
            headers: {
                'Content-Type': "application/json",
                'Authorization':localStorage.getItem("token")
            },
            data:param
        });
    },
    put:(url,param) =>{
        return axios({
            method:'put',
            url:url,
            headers: {
                'Content-Type': "application/json",
                'Authorization':localStorage.getItem("token")
            },
            data:param
        });
    },
    customize:(option)=>{
        return axios(option);
    }
}