import React,{Component} from 'react';
import { Form, Input, Button, Checkbox,Card,message } from 'antd';
import "./login.css"
import {reqlogin} from "../../api";


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const onFinish = values => {
    console.log('Success:', values);

    reqlogin({
        username:values.username,
        password:values.password
    }).then(res=>{
        console.log(res);
        if(res.status===200){
            message.info('登录成功');
        }else{
            message.info(res.message);
        }
    }).catch(err=>{
        console.log(err);
        message.error('用户不存在');
    })

};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

export default class Login  extends Component{

    render(){
        return (
            <Card title="用户登录" className="login-form">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}