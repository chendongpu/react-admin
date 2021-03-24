import React,{Component} from 'react';
import storeUtils from "../../utils/storeUtils";
import {Switch,Route,Redirect} from 'react-router-dom';
import { Layout} from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'



import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Decorate from "../decorate/decorate";
import Setting from "../setting/setting";
import store from "../../store";
import {Provider} from 'react-redux';

const {Footer,Content} =Layout;

export default class Admin  extends Component{

    render(){

        const token=storeUtils.getToken();

        console.log("token===",token);
        if(!token){
            return <Redirect to="/login" />
        }





        return (
            <Provider store={store}>
                <Layout style={{height:'100%'}}>

                    <LeftNav>
                    </LeftNav>
                    <Layout>
                        <Header />
                        <Content style={{'padding':'20px'}}>
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/category" component={Category} />
                                <Route path="/product" component={Product} />
                                <Route path="/decorate" component={Decorate} />
                                <Route path="/setting" component={Setting} />
                                <Redirect to="/home" />
                            </Switch>
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </Provider>
            )

    }
}