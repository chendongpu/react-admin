import  React,{Component} from 'react';
import {Layout,Menu} from "antd";
import {
    AppstoreOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import logo from "../../assets/logo.svg";
import {Link} from 'react-router-dom';
const { SubMenu } = Menu;


const {Header,Sider} =Layout;

export default class Index extends Component{
    render(){
        return (
            <Sider>
                <Header style={{marginTop:'20px'}}>
                    <img src={logo} />
                </Header>


                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"

                    >
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to="/home">首页</Link>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品管理">
                            <Menu.Item key="2">
                                <Link to="/category">分类管理</Link>
                                 </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/product">商品管理</Link>
                            </Menu.Item>
                        </SubMenu>

                    </Menu>

            </Sider>
        )
    }
}



