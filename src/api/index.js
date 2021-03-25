import ajax from './ajax'
import storeUtils from "../utils/storeUtils";

let headers={};
headers['Access-Token']=storeUtils.getToken();

export const reqlogin=(username,password)=>ajax('/admin/member/login',{username,password},'POST');

export const reqcategorys=(pid)=>ajax('/admin/goodscategory/list',{pid},'GET',headers);


export const reqcategorysdel=(id)=>ajax('/admin/goodscategory/del',{id},'POST',headers);
