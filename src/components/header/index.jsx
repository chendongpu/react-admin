import  React,{Component} from 'react';
import "./header.css"
import {Layout, Menu, Dropdown,message ,Badge,Modal} from "antd";
import { DownOutlined } from '@ant-design/icons';
import EditPasswordForm from "../edit-password-form/index"
const {Header} =Layout;


export default class Index extends Component{

    state = {
        passwordEditShow: false
    };



    render(){

        const { passwordEditShow } = this.state;

        console.log("passwordEditShow:",passwordEditShow);

        const popMenu=(
            <Menu onClick={(p)=>{
                console.log("p:",p);
                if(p.key==="passwordEdit"){
                    return this.setState({
                        passwordEditShow: true
                    })
                }else{
                    message.success(p.key);
                }



            }}>
                <Menu.Item key="passwordEdit">修改密码</Menu.Item>
                <Menu.Item key="logout">退出登录</Menu.Item>
            </Menu>
        );
        return (
            <Header className="header">
                <div className="logo" >

                </div>
                <Dropdown overlay={popMenu}>
                    <div>
                        <Badge><span>admin<DownOutlined /></span></Badge>
                    </div>

                </Dropdown>


                <Modal
                    title="修改密码"
                    visible={passwordEditShow}
                    footer={null}
                    onCancel={() => {
                        this.setState({ passwordEditShow: false });
                    }}
                >
                    <EditPasswordForm
                        {...this.props}
                        close={() => {
                            this.setState({ passwordEditShow: false });
                        }}
                    />
                </Modal>

            </Header>
        )
    }
}