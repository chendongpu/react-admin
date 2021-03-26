import ajax from './ajax'
import storeUtils from "../utils/storeUtils";

let headers={};
headers['Access-Token']=storeUtils.getToken();

export const reqlogin=(username,password)=>ajax('/admin/member/login',{username,password},'POST');

export const reqselfpassword=(values)=>ajax('/admin/member/selfPassword',values,'POST',headers);

export const reqcategorys=(pid)=>ajax('/admin/goodscategory/list',{pid},'GET',headers);


export const reqcategorysdel=(id)=>ajax('/admin/goodscategory/del',{id},'POST',headers);

export const reqcategorysadd=(values)=>ajax('/admin/goodscategory/add',values,'POST',headers);

export const reqcategorysedit=(values)=>ajax('/admin/goodscategory/edit',values,'POST',headers);

