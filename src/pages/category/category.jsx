import  React,{Component} from 'react';
import { connect } from "react-redux";
import {
    getGoodsCategoryList,
} from "../../actions/goods/category";

class Category extends Component {


    componentDidMount() {
        const { dispatch } = this.props;
        console.log("dispatch",dispatch);
        dispatch(getGoodsCategoryList())
    }


    render() {
        return (

                <div>category</div>
        )
    }
}

export default connect(props=>props)(Category);