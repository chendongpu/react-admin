import axios from 'axios';
import { message } from 'antd';
import storeUtils from "../utils/storeUtils";
export default class Fetch {
    static  fetch(obj={}){
        const {api,data}=obj;
       let url=api.url;
       let type=api.method;
        return new Promise((resolve,reject)=>{
            let headers={};
            headers['Access-Token']=storeUtils.getToken();
            console.log(headers);
            let promise;
            if(type==='GET'){
                promise = axios.get(url,{params:data,
                    headers:headers
                })
            }else{
                promise = axios.post(url,data,{headers:headers});
            }
            promise.then(response=>{
                resolve(response.data);
            }).catch(error=>{
                message.error('请求出错了:'+error.message);
            })
        });
    }
}
