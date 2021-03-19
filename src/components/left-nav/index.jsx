import  React,{Component} from 'react';
import {Layout,Menu} from "antd";
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import logo from "../../assets/logo.svg";
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
                            首页
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品管理">
                            <Menu.Item key="2">分类管理 </Menu.Item>
                            <Menu.Item key="3">商品管理 </Menu.Item>
                        </SubMenu>

                    </Menu>

            </Sider>
        )
    }
}



