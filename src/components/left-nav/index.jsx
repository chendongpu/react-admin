import  React,{Component} from 'react';
import {Layout,Menu} from "antd";
import logo from "../../assets/logo.svg";
import {Link} from 'react-router-dom';
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
const {Header,Sider} =Layout;

export default class Index extends Component{


    getMenuNodes=(menuList)=>{
        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key} >
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                );
            }else{
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                );
            }
        })
    };

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
                {this.getMenuNodes(menuList)}
                </Menu>
            </Sider>
        )
    }
}



