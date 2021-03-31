import  React,{Component} from 'react';
import ImagePicker from "../../components/goods/image-picker";
import PicturesWall from "../../components/goods/pictures-wall";

export default class ProductEdit extends Component {
    state={
        modalVisible:false,
        images:[]
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


    render() {
        const {modalVisible,images,fl}=this.state;
        console.log("images",images);
        return (
            <div>


                <PicturesWall  fl={images} selectImage={()=>{this.showImage()}} setImages={(tmp)=>{
                    this.setState({images:tmp});
                }}/>

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
            </div>
        )
    }
}