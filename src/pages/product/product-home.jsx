import  React,{Component} from 'react';
import {Card, Table, Button, Popconfirm, message} from 'antd'

import {withRouter} from 'react-router-dom'
import {reqgoods} from "../../api";

class ProductHome extends Component {

    state={
        columns:[],
        loading:false,
        goods:[]
    };

    getGoods=async (page,rows)=>{
        this.setState({
            loading:true
        });
        const response = await reqgoods({page,rows});
        console.log("请求成功",response);
        if(response.code===0){
            console.log(response);

            this.setState({
                loading:false,
                goods:response.result.list
            });
        }else{
            message.error(response.msg);
        }
    };

    initColumns=()=>{
        this.setState({
            columns:
                [{
                },{
                    title:'商品标题',
                    dataIndex:'title'
                },{
                    title:'操作',
                    render:(txt,record,index)=>{
                        return (
                            <div>
                                <Button type="primary" size="small" onClick={()=>{
                                    console.log("record",record);

                                }}>修改</Button>
                                <Popconfirm title="确定要删除此项么?" onCancel={()=>{console.log("用户取消删除")}} onConfirm={()=>{

                                }}>
                                    <Button type="danger" style={{margin:"0 1rem"}} size="small">删除</Button>
                                </Popconfirm>
                            </div>
                        )
                    }
                }]
        });
        this.getGoods(1,10);
    };

    componentWillMount(){
        this.initColumns();
    }

    render() {

        const {columns,loading,goods}= this.state;

        return (

            <Card
                title="商品列表" extra={
                <Button type="primary" size="small" onClick={
                    ()=>{
                        this.props.history.push('/product/edit')
                    }
                }>Add</Button>
            }
            >

                <Table loading={loading} rowKey="id"  columns={columns} bordered dataSource={goods}/>
            </Card>
        )
    }
}
export default withRouter(ProductHome);