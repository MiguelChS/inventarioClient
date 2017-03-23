/**
 * Created by mc185249 on 3/2/2017.
 */
import axios from 'axios';

export  default {
    get:(url)=>{
        return axios.get(url);
    },
    post:(url,param) =>{
        return axios.post(url,param);
    }
}