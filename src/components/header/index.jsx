import  React,{Component} from 'react';
import "./header.css"
import {Layout, Menu, Dropdown,Avatar,message ,Badge} from "antd";
import { DownOutlined } from '@ant-design/icons';
const {Header} =Layout;

export default class Index extends Component{
    render(){
        const popMenu=(
            <Menu onClick={(p)=>{

                    message.success(p.key);

            }}>
                <Menu.Item key="noti">通知中心</Menu.Item>
                <Menu.Item key="setting">设置</Menu.Item>
                <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
        );
        return (
            <Header className="header">
                <div className="logo" >

                </div>
                <Dropdown overlay={popMenu}>
                    <div>
                        <Avatar>U</Avatar>
                        <Badge><span style={{color:'#fff'}}>超级管理员<DownOutlined /></span></Badge>
                    </div>

                </Dropdown>
            </Header>
        )
    }
}