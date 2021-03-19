import React,{Component} from 'react';
import storeUtils from "../../utils/storeUtils";
import {Switch,Route,Redirect} from 'react-router-dom';
import { Layout} from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'



import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';

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
                <Content>
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/category" component={Category} />
                        <Route path="/product" component={Product} />
                        <Redirect to="/home" />
                    </Switch>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    }
}