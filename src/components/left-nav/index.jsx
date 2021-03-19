import  React,{Component} from 'react';
import {Layout,Menu} from "antd";
import logo from "../../assets/logo.svg";
import {Link,withRouter} from 'react-router-dom';
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
const {Header,Sider} =Layout;

class Index extends Component{


    getMenuNodes=(menuList)=>{
        const path=this.props.location.pathname;

        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key} >
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                );
            }else{

                const cItem=item.children.find(cItem=>cItem.key===path);
                if(cItem){
                    this.openKey=item.key;
                }

                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                );
            }
        })
    };


    componentWillMount(){
        this.menuNodes=this.getMenuNodes(menuList);
    }

    render(){

        const path=this.props.location.pathname;

        const openKey=this.openKey;


        return (
            <Sider>
                <Header style={{marginTop:'20px'}}>
                    <img src={logo} />
                </Header>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"

                >
                {this.menuNodes}
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(Index)

