import  React,{Component} from 'react';
import {Form, Input, Button, message} from 'antd';
import ImagePicker from "../../components/goods/image-picker";
import PicturesWall from "../../components/goods/pictures-wall";
import CategoryTag from "../../components/goods/category-tag";
import {reqcategorys} from '../../api/index';
import menuList from "../../config/menuConfig";

export default class ProductEdit extends Component {
    state={
        modalVisible:false,
        images:[],
        categorys:[]
    };

    showImage=()=>{
        this.setState({modalVisible:true});
        console.log("show img");
    };

    //获取images中uid乘以-1后的最大值
    maxUid=(images)=>{
        let tmp=images.map((e)=>{
            return parseInt(e.uid)*-1;
        });
        let max=0;
        tmp.filter((t)=>{
            if(t>max){
               max = t
            }
        });
        return max;
    };

    getCategory=async ()=>{
        const response = await reqcategorys();
        console.log("请求成功",response);
        if(response.code===0){
            console.log(response);
            this.setState({
                categorys:response.result.list
            });
        }else{
            message.error(response.msg);
        }
    };

    componentWillMount(){
        this.getCategory();
    }


    render() {
        const {modalVisible,images,categorys}=this.state;
        console.log("images",images);

        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 20,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 4,
                span: 20,
            },
        };


        const onFinish = (values) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        const checkPictures = (_, value) => {
            if (images.length > 0) {
                return Promise.resolve();
            }

            return Promise.reject(new Error('请选择商品图!'));
        };

        return (



                <Form
                    {...layout}
                    style={{background:"#fff",paddingTop:"20px",paddingBottom:"20px"}}
                    name="basic"
                    initialValues={{}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="商品图"
                        required
                        name="pictures"
                        rules={[
                            {
                                validator: checkPictures,
                            },
                        ]}
                    >
                        <PicturesWall  fl={images} selectImage={()=>{this.showImage()}} setImages={(tmp)=>{
                            this.setState({images:tmp});
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="商品名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品名称!',
                            },
                        ]}
                    >
                        <Input style={{width: 500}} />
                    </Form.Item>

                    <Form.Item
                        label="商品分类"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: '请选择商品分类!',
                            },
                        ]}
                    >
                        <CategoryTag categorys={categorys} />
                    </Form.Item>



                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                    <ImagePicker visible={modalVisible} max={this.maxUid(images)} closeHandler={()=>{this.setState({modalVisible:false});}}   setImages={(imgs)=>{
                        let tmp =[];
                        images.map((a)=>{
                            tmp.push(a);
                        });
                        imgs.map((a)=>{
                            tmp.push(a);
                        });
                        this.setState({images:tmp});
                    }}></ImagePicker>
                </Form>

        )
    }
}