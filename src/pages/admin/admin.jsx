import React,{Component} from 'react';
import storeUtils from "../../utils/storeUtils";
import {Redirect} from 'react-router-dom';

export default class Admin  extends Component{

    render(){

        const token=storeUtils.getToken();

        console.log("token===",token);
        if(!token){
            return <Redirect to="/login" />
        }


        return <div >
            Admin {token}
        </div>
    }
}