import  React,{Component} from 'react';
import { connect } from "react-redux";
import {
    getGoodsCategoryList,
} from "../../actions/goods/category";

import {reqcategorys, reqlogin} from '../../api/index';

import {Card, Table, Button, Popconfirm, Upload, message} from 'antd'
import storeUtils from "../../utils/storeUtils";

class Category extends Component {

    state={
        loading:false,
        categorys:[]
    };

    getCategory=async ()=>{
        this.setState({
            loading:true
        })
        const response = await reqcategorys(0);
        console.log("请求成功",response);
        if(response.code===0){
            console.log(response);
            this.setState({
                loading:false,
                categorys:response.result.list
            })
        }else{
            message.error(response.msg);
        }
    };

    initColumns=()=>{
        this.columns=[{
            title:'序号',
            key:'id',
            width:80,
            align:'center',
            render:(txt,record,index)=>index+1
        },{
            title:'分类名字',
            dataIndex:'name'
        },{
            title:'操作',
            render:(txt,record,index)=>{
                return (
                    <div>
                        <Button type="primary" size="small">修改</Button>
                        <Button type="primary" size="small" style={{margin:"0 1rem"}}>查看子分类</Button>
                        <Popconfirm title="确定要删除此项么?" onCancel={()=>{console.log("用户取消删除")}} onConfirm={()=>{console.log("用户确认删除")}}>
                            <Button type="danger" style={{margin:"0 1rem"}} size="small">删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }];
        this.getCategory();
    };

     componentWillMount(){
        this.initColumns()
    }

    componentDidMount() {
        const { dispatch } = this.props;
        console.log("dispatch",dispatch);
        dispatch(getGoodsCategoryList())
    }


    render() {
        const {loading,categorys}=this.state;

        let title="一级分类";

        console.log("categorys",categorys);


        return (

            <Card
                title={title} extra={
                <Button type="primary" size="small" >添加分类</Button>
            }
            >

                <Table loading={loading}  pagination={{defaultPageSize:2}}  rowKey="id" columns={this.columns} bordered dataSource={categorys} />
            </Card>
        )
    }
}

export default connect(props=>props)(Category);