import  React,{Component} from 'react';
import {Button,List} from "antd";
import ImagePicker from "../../components/goods/image-picker";

export default class ProductEdit extends Component {
    state={
        modalVisible:false,
        images:[]
    };

    showImage=()=>{
        this.setState({modalVisible:true});
        console.log("show img");
    };




    render() {
        const {modalVisible,images}=this.state;
        console.log("images",images);
        return (
            <div>
                <Button onClick={()=>{this.showImage()}}>选择图片</Button>

                <List
                    dataSource={images}

                    renderItem={item => (
                        <List.Item>

                            <img src={item} style={{width:'50px',height:'50px'}} />

                        </List.Item>
                    )}
                />

                <ImagePicker visible={modalVisible} closeHandler={()=>{this.setState({modalVisible:false});}}   setImages={(imgs)=>{
                    let tmp =[];
                    images.map((a)=>{
                        tmp.push(a);
                    });
                    imgs.map((a)=>{
                        tmp.push(a);
                    });
                    this.setState({images:tmp});
                }}></ImagePicker>
            </div>
        )
    }
}