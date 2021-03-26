import  React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductHome from './product-home'
import ProductEdit from "./product-edit";
import ProductDetail from "./product-detail";

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact/>
                <Route path='/product/edit' component={ProductEdit} exact/>
                <Route path='/product/detail' component={ProductDetail} exact/>
                <Redirect to="/product" />
            </Switch>
        )
    }
}