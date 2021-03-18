import ajax from './ajax'

export const reqlogin=(username,password)=>ajax('/admin/member/login',{username,password},'POST');