import React,{useEffect,useState} from 'react'
import {Modal,Cascader, Button,Form, Input } from 'antd';

export default function CategoryForm(props){
    const [form] = Form.useForm();

    const {visible,categorys,record,closeHandler,onFinish,setPid}=props;

    const [def,setDef]=useState([]);

    useEffect(()=>{
        if(record===undefined){
            form.resetFields();
        }else{
            let newArray=toList(categorys);
            let sj=shangji(record.id,newArray,[]);
            let sj_=sj.reverse();
            setDef(sj_);
            form.setFieldsValue(record);
        }

    },[visible]);

    const layout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    };

    const toList = (list,newArray=[]) => {
        if(list && list.length>0){
            list.map((e) => {
                newArray.push(e);
                if (e.children && e.children.length>0) {
                    toList(e.children,newArray);
                }
            })
        }
        return newArray;
    };

    const shangji=(id,list,newArray=[])=>{
        if(list && list.length>0){
            list.map(e=>{
                if(e.id===id){
                    if(e.pid===0){
                        return newArray;
                    }else{
                        newArray.push(e.pid);
                        shangji(e.pid,list,newArray);
                    }
                }
            });
        }
        return newArray;
    };


    const onOK=()=>{
        form.submit();
    };

    const onFinishFailed=errorInfo=>{
        console.log('Failed:',errorInfo);
    }

    const onChange=(value) => {
        console.log("vvvaluevvv",value);
        setPid(value.length>1?value[value.length-1]:0);
    }

    return (
        <div>
            <Modal  forceRender title="Basic Modal"  visible={visible} onOk={onOK} onCancel={closeHandler}>

                <Form
                    form={form}
                    {...layout}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    name="basic"
                >
                    <Form.Item label="上级分类">

                    <Cascader key={def} defaultValue={def} options={categorys} onChange={ onChange} changeOnSelect={true} placeholder="Please select" />
                </Form.Item>

                    <Form.Item
                        label="分类名字"
                        name="name"
                        rules={[{ required: true, message: '请输入分类名字!' }]}
                    >
                        <Input />
                    </Form.Item>


                </Form>



            </Modal>
        </div>
    );
};
