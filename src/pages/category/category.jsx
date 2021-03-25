import  React,{Component} from 'react';
import { connect } from "react-redux";
import {
    getGoodsCategoryList,
} from "../../actions/goods/category";

import {reqcategorys, reqlogin} from '../../api/index';

import {Card, Table, Switch, Space,Button, Popconfirm, Upload, message} from 'antd'
import storeUtils from "../../utils/storeUtils";

class Category extends Component {

    state={
        loading:false,
        categorys:[],
        expandedRowKeys:[]
    };

    getExpandedRowKeys = (e) => {
        const _array = []
        const getListKey = (list) => {
            list.map((a) => {
                _array.push(a.id)
                if (a.children && a.children.length) {
                    getListKey(a.children)
                }
            })
        }
        getListKey(e)
        return _array
    }

    toCategoryTree = (list) => {
        const newArray = [];
        list.map((e) => {
            e.children = e._child;
            e.title=e.name;
            delete e.icon;
            e.key=e.id;
            newArray.push(e);
            console.log("=e=",e);

            if ( e.children.length) {
                return this.toCategoryTree(e.children)
            }




        });
        return newArray
    };

    getCategory=async ()=>{
        this.setState({
            loading:true
        })
        const response = await reqcategorys(0);
        console.log("请求成功",response);
        if(response.code===0){
            console.log(response);
            let tree=this.toCategoryTree(response.result.list);
            this.setState({
                loading:false,
                categorys:tree,
                expandedRowKeys :this.getExpandedRowKeys(tree)
            });
        }else{
            message.error(response.msg);
        }
    };



    initColumns=()=>{
        this.columns=[{
        },{
            title:'分类名字',
            dataIndex:'name'
        },{
            title:'操作',
            render:(txt,record,index)=>{
                return (
                    <div>
                        <Button type="primary" size="small">修改</Button>
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



        const {loading,categorys,expandedRowKeys}=this.state;



        console.log("categorys",categorys);




        return (

            <Card
                title={
                    <div>
                    <Button type="primary" size="small" >添加分类</Button>
                        <Button
                            onClick={() => {
                                this.setState({
                                    expandedRowKeys: this.getExpandedRowKeys(categorys)
                                })
                            }}
                        >
                            全部展开
                        </Button>
                        <Button
                            onClick={() => {
                                this.setState({
                                    expandedRowKeys: []
                                })
                            }}
                        >
                            全部折叠
                        </Button>
                    </div>
                }
            >

                {categorys && categorys.length ? <Table
                    className="m-cover-ant-table"
                    columns={this.columns}
                    expandIconAsCell={false}
                    expandRowByClick={true}
                    expandedRowKeys={expandedRowKeys}
                    dataSource={categorys}
                    onExpand={(bool, row) => {
                        if (bool) {
                            this.setState({
                                expandedRowKeys: [...expandedRowKeys, row.id]
                            })
                        } else {
                            const index = expandedRowKeys.findIndex((e) => e === row.id)
                            const newArray = [...expandedRowKeys]
                            newArray.splice(index, 1)
                            this.setState({
                                expandedRowKeys: newArray
                            })
                        }
                    }}

                    pagination={false}/> : '暂无数据'}



            </Card>
        )
    }
}

export default connect(props=>props)(Category);