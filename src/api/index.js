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

export const reqgoods=(values)=>ajax('/admin/goods/list',values,'GET',headers);

export const reqgoodsoffsale=(values)=>ajax('/admin/goods/offSale',values,'POST',headers);

export const reqgoodsonsale=(values)=>ajax('/admin/goods/onSale',values,'POST',headers);

