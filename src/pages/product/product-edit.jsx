import  React,{Component} from 'react';
import {Form, Input,InputNumber, Button, message} from 'antd';
import ImagePicker from "../../components/goods/image-picker";
import PicturesWall from "../../components/goods/pictures-wall";
import CategoryTag from "../../components/goods/category-tag";
import {reqcategorys,reqgoodsspec} from '../../api/index';
import GoodsSku from "../../components/goods/goods-sku";

export default class ProductEdit extends Component {
    state={
        modalVisible:false,
        images:[],
        categorys:[],
        specList:[],
        skus: [
            {
                spec: [
                    {
                        id: 0,
                        name: null,
                        value_id: 0,
                        value_name: null,
                        value_img: null
                    }
                ],
                price: null,
                stock: null,
                code: null,
                weight: null
            }
        ],
        multiSpec:false
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

    getGoodsSpec=async ()=>{
        const response = await reqgoodsspec({});
        console.log("请求成功",response);
        if(response.code===0){
            console.log(response);
            this.setState({
                specList:response.result.list
            });
        }else{
            message.error(response.msg);
        }
    };

    setSkus=(skus)=>{
        this.setState({
            skus
        });
    }

    componentDidMount(){
        this.getCategory();
        //分类列表
        this.getGoodsSpec();

        //sku列表
        // this.setState({
        //     skus:[
        //         {
        //             "price": 1,
        //             "stock": 1,
        //             "code": 1,
        //             "spec": [
        //                 {
        //                     "id": 1,
        //                     "name": "分类一",
        //                     "value_id": 1,
        //                     "value_name": "1-a"
        //                 },
        //                 {
        //                     "id": 2,
        //                     "name": "分类2",
        //                     "value_id": 5,
        //                     "value_name": "2-b"
        //                 }
        //             ],
        //             "weight": null
        //         },
        //         {
        //             "price": 2,
        //             "stock": 2,
        //             "code": 2,
        //             "spec": [
        //                 {
        //                     "id": 1,
        //                     "name": "分类一",
        //                     "value_id": 2,
        //                     "value_name": "1-b"
        //                 },
        //                 {
        //                     "id": 2,
        //                     "name": "分类2",
        //                     "value_id": 5,
        //                     "value_name": "2-b"
        //                 }
        //             ],
        //             "weight": null
        //         },
        //         {
        //             "price": 3,
        //             "stock": 3,
        //             "code": 3,
        //             "spec": [
        //                 {
        //                     "id": 1,
        //                     "name": "分类一",
        //                     "value_id": 3,
        //                     "value_name": "1-c"
        //                 },
        //                 {
        //                     "id": 2,
        //                     "name": "分类2",
        //                     "value_id": 5,
        //                     "value_name": "2-b"
        //                 }
        //             ],
        //             "weight": null
        //         },
        //         {
        //             "price": 4,
        //             "stock": 4,
        //             "code": 4,
        //             "spec": [
        //                 {
        //                     "id": 1,
        //                     "name": "分类一",
        //                     "value_id": 1,
        //                     "value_name": "1-a"
        //                 },
        //                 {
        //                     "id": 2,
        //                     "name": "分类2",
        //                     "value_id": 4,
        //                     "value_name": "2-a"
        //                 }
        //             ],
        //             "weight": null
        //         },
        //         {
        //             "price": 5,
        //             "stock": 5,
        //             "code": 5,
        //             "spec": [
        //                 {
        //                     "id": 1,
        //                     "name": "分类一",
        //                     "value_id": 2,
        //                     "value_name": "1-b"
        //                 },
        //                 {
        //                     "id": 2,
        //                     "name": "分类2",
        //                     "value_id": 4,
        //                     "value_name": "2-a"
        //                 }
        //             ],
        //             "weight": null
        //         },
        //         {
        //             "price": 6,
        //             "stock": 6,
        //             "code": 6,
        //             "spec": [
        //                 {
        //                     "id": 1,
        //                     "name": "分类一",
        //                     "value_id": 3,
        //                     "value_name": "1-c"
        //                 },
        //                 {
        //                     "id": 2,
        //                     "name": "分类2",
        //                     "value_id": 4,
        //                     "value_name": "2-a"
        //                 }
        //             ],
        //             "weight": null
        //         }
        //     ]
        // });

    }

    onMultiSpecChange=(e) => {
            this.setState({multiSpec: !!e.multi})
    };


    render() {
        const {modalVisible,images,categorys,specList,skus,multiSpec}=this.state;
        console.log("images",images);
        console.log("skus",skus);

        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 24,
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



                    <GoodsSku
                                layout={layout}
                                skus={skus}
                                specList={specList}
                                setSpecList={(specList)=>{this.setState({specList:specList})}}
                                setSkus={(skus_)=>{
                                    this.setSkus(skus_)
                                }}
                                onChange={(skus) => {
                                    this.setSkus(skus)
                                }}
                                reset={() => {
                                    console.log("======reset被调用=======")
                                    this.setSkus([])
                                }}
                                onMultiSpecChange={(e)=>{this.onMultiSpecChange(e)}}/>








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