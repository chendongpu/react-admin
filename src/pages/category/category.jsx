import  React,{Component} from 'react';
import { connect } from "react-redux";
import {
    getGoodsCategoryList,
} from "../../actions/goods/category";

import {reqcategorys, reqcategorysdel,reqcategorysadd,reqcategorysedit} from '../../api/index';

import {Card, Table, Switch, Space,Button, Popconfirm, Upload, message} from 'antd'
import storeUtils from "../../utils/storeUtils";

import CategoryForm from '../../components/goods/category-form/index'

class Category extends Component {

    state={
        loading:false,
        categorys:[],
        expandedRowKeys:[],
        modalVisible:false,
        record:{},
        pid:0
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
            e.label=e.name;
            e.value=e.id;
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

    delCategory=async (id)=>{
        const response = await reqcategorysdel(id);
        console.log("删除成功",response);
        if(response.code===0){
            this.getCategory();
        }else{
            message.error(response.msg);
        }
    };


    addCategory=async (values)=>{
        const response = await reqcategorysadd(values);
        console.log("添加成功",response);
        if(response.code===0){
            this.getCategory();
        }else{
            message.error(response.msg);
        }
    };

    editCategory=async (values)=>{
        const response = await reqcategorysedit(values);
        console.log("修改成功",response);
        if(response.code===0){
            this.getCategory();
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
                        <Button type="primary" size="small" onClick={()=>{
                            console.log("record",record);
                            this.setState({modalVisible:true,record:record});
                        }}>修改</Button>
                        <Popconfirm title="确定要删除此项么?" onCancel={()=>{console.log("用户取消删除")}} onConfirm={()=>{
                            this.delCategory(record.id);
                        }}>
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



        const {loading,categorys,expandedRowKeys,modalVisible,record,pid}=this.state;



        console.log("categorys",categorys);




        return (

            <Card
                title={
                    <div>
                    <Button type="primary" size="small" onClick={()=>{
                        this.setState({modalVisible:true,record:undefined});
                    }}>添加分类</Button>
                        <Button size="small"  style={{margin:"0 1rem"}}
                            onClick={() => {
                                this.setState({
                                    expandedRowKeys: this.getExpandedRowKeys(categorys)
                                })
                            }}
                        >
                            全部展开
                        </Button>
                        <Button size="small"  style={{margin:"0 1rem"}}
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

                <CategoryForm visible={modalVisible} closeHandler={()=>{this.setState({modalVisible:false});}} categorys={categorys}  record={record} onFinish={(values)=>{
                    var id=0;
                    if(record){
                        id=record.id;
                    }
                    if(id){
                        record.name=values.name;
                        record.pid=pid;
                        this.editCategory(record);
                    }else{
                        this.addCategory(values);
                    }
                    this.setState({modalVisible:false})
                }} setPid={(pid)=>{
                    this.setState({pid:pid})}}></CategoryForm>
            </Card>

        )
    }
}

export default connect(props=>props)(Category);