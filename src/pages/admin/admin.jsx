import React,{Component} from 'react';
import storeUtils from "../../utils/storeUtils";
import {Redirect} from 'react-router-dom';
import { Layout} from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
const {Footer,Content} =Layout;

export default class Admin  extends Component{

    render(){

        const token=storeUtils.getToken();

        console.log("token===",token);
        if(!token){
            return <Redirect to="/login" />
        }





        return <Layout style={{height:'100%'}}>

            <LeftNav>
            </LeftNav>
            <Layout>
                <Header />
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    }
}