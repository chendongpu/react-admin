import  React,{Component} from 'react';
import "./header.css"
import {Layout, Menu, Dropdown,message ,Badge,Modal} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import EditPasswordForm from "../edit-password-form/index"
import storeUtils from "../../utils/storeUtils";
const {Header} =Layout;


class Index extends Component{

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
                }
                if(p.key==="logout"){
                  return  Modal.confirm({
                      title: '提示',
                      icon: <ExclamationCircleOutlined />,
                      content: '确定要退出登录吗？',
                      okText: '确认',
                      cancelText: '取消',
                      onOk:()=>{
                          console.log("ok");
                          storeUtils.removeToken();
                            this.props.history.replace('/login')
                        },
                        onCancel:()=>{
                            console.log("cancel");
                        }
                  });
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
export default withRouter(Index)