import  React,{Component} from 'react';
import {Card, Table, Button, Popconfirm, message,Switch} from 'antd'

import {withRouter} from 'react-router-dom'
import {reqgoods,reqgoodsoffsale,reqgoodsonsale} from "../../api";
import moment from 'moment';

class ProductHome extends Component {

    state={
        columns:[],
        loading:false,
        goods:[]
    };

    onSale=async (values)=>{
        this.setState({
            loading:true
        });
        const response = await reqgoodsonsale(values);
        console.log("请求成功",response);
        if(response.code===0){
            console.log(response);
            this.getGoods(1,10)
        }else{
            message.error(response.msg);
        }
    };

    offSale=async (values)=>{
        this.setState({
            loading:true
        });
        const response = await reqgoodsoffsale(values);
        console.log("请求成功",response);
        if(response.code===0){
            console.log(response);
            this.getGoods(1,10)
        }else{
            message.error(response.msg);
        }
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
                [{  title:'商品图',
                    dataIndex: 'img',
                    render:(txt)=>{
                        return <img src={txt} style={{width:'50px',height:'50px'}} />;
                    }
                },{
                    title:'商品标题',
                    dataIndex:'title'
                },{
                    title:'价格（元）',
                    dataIndex:'price'
                },
                {
                    title:'销量',
                    dataIndex:'base_sale_num'
                },{
                    title:'库存',
                    dataIndex:'stock'
                },{
                    title:'分类',
                    dataIndex:'category_ids'
                },{
                    title:'创建时间',
                    dataIndex:'create_time',
                    render: e => moment(e * 1000).format('YYYY-MM-DD hh:mm'),
                },{
                    title: "上架状态",
                    dataIndex: "is_on_sale",
                    render: (text, record) => <Switch
                        defaultChecked={!!text}
                        onChange={(checked) => {
                            if (checked) {
                                console.log(" switch true ")
                                //上架
                                this.onSale({ids:[record.id]});
                            } else {
                                console.log(" switch false ")
                                //下架
                                this.offSale({ids:[record.id]});
                            }
                        }}
                    />
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