import React,{Component} from 'react';
import { Form, Input, Button, Checkbox,Card,message } from 'antd';
import "./login.css"
import {reqlogin} from "../../api";
import storeUtils from "../../utils/storeUtils";
import {Redirect} from 'react-router-dom';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};




export default class Login  extends Component{

    render(){

        const token=storeUtils.getToken();
        if(token){
            return <Redirect to="/" />
        }
        const onFinish =(async (values)=>{
            console.log('Success:', values);
            const response = await reqlogin(values.username,values.password);
            console.log("请求成功",response);
            if(response.code===0){
                message.success("登录成功");
                storeUtils.saveToken(response.result.access_token);
                this.props.history.replace('/');
            }else{
                message.error(response.msg);
            }


        }) ;

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

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