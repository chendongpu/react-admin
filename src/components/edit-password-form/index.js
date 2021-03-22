import  React from 'react';
import {Form,Input,Button,message} from "antd";

export default function EditPasswordForm(props) {

    const [form] =Form.useForm();

    const {  close } = props;

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
    const tailLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 16,
                offset: 8
            }
        }
    };
    const onFinish=values => {
        console.log('Success:', values);
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('请输入正确的内容');
    };


    return (
        <Form
            form={form}
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="现密码"
                name="oldpassword"
                rules={[{ required: true, message: '请输入现密码!' }]}
            >
                <Input type="password" placeholder="请输入现密码" />
            </Form.Item>
            <Form.Item
                label="新密码"
                name="password"
                rules={[{ required: true, message: '请输入新密码!' },{
                    validator: (_, value) =>{
                        console.log("oldpassword",form.getFieldValue('oldpassword'))
                        if(value===form.getFieldValue('oldpassword')) {
                            return Promise.reject('两次密码不能一样')
                        }else{
                            return Promise.resolve()
                        }
                    }
                }
                ]}
            >
                <Input type="password" placeholder="请输入新密码" />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button
                    style={{
                        marginRight: 10
                    }}
                    onClick={() => {
                        close();
                    }}
                >
                    取消
                </Button>
                <Button type="primary" htmlType="submit">
                    修改
                </Button>
            </Form.Item>
        </Form>
    )

}