import React,{useEffect,useState} from 'react'
import ReactFileReader from "react-file-reader";
import {Modal, List, Checkbox, message,Button} from 'antd';
import './index.css'
import { reqimage,reqimageadd} from "../../../api";


export default function ImagePicker(props){


    const {visible,closeHandler,setImages}=props;

    const [data,setData]=useState([]);
    const [total,setTotal]=useState(0);
    const [imgs,setImgs]=useState([]);
    const [loading,setLoading]=useState(false);


    // 获取上传的图片的base64地址

    const handleFiles =async (files) => {

        console.log(files.base64);
        const response = await reqimageadd({image:files.base64,is_save:1});
        console.log("请求成功",response);
        setLoading(true);
        if(response.code===0){
            console.log(response);
            setLoading(false);
            getImages(1,3);
        }else{
            console.log("请求失败",response.msg);
        }


    };


    const onOK=()=>{
        console.log("ok click");
        setImages(imgs);
        closeHandler();
    };

    const toggleChecked=(item)=>{
        let tmp = data.map((d)=>{
            if(item.id===d.id){
                d.checked=(d.checked===1)?0:1;
                //切换到选中时，加入图片地址,不选中就去掉图片地址
                let tmp=[];
                if(d.checked===1){
                    tmp=imgs;
                    tmp.push(d.url);
                }else{
                    tmp=imgs.filter((url)=>{
                        if(url!==d.url){
                            return url;
                        }
                    });
                }
                setImgs(tmp);
            }
            return d;
        });
        setData(tmp);
    };

    const imgClick=(e,item)=>{
       toggleChecked(item);
        console.log("imgs",imgs);
    };

    const getImages=async (page,rows)=>{
        const response = await reqimage({page,rows});
        console.log("请求成功",response);
        if(response.code===0){
            console.log(response);
            let list= [...response.result.list];
            list = list.map((a)=>{return {...a,checked:0}});
            setData(response.result.list);
            setTotal(response.result.total_number);
        }else{
            console.log("请求失败",response.msg);
        }
    };


    useEffect(()=>{
        setImgs([]);
       getImages(1,3);
    },[visible]);

    const onChange=(e,item)=> {
        console.log(`checked = ${e.target.checked}`);
        console.log("item",item);
        toggleChecked(item);
    };

    return (

        <div>
            <Modal  forceRender title="Basic Modal"  visible={visible} onOk={onOK} onCancel={closeHandler}>



                <ReactFileReader
                    fileTypes={[".png",".jpg",".gif", "jpeg"]}
                    base64
                    multipleFiles={!1}
                    handleFiles={handleFiles}>
                    <Button loading={loading}>上传图片</Button>

                </ReactFileReader>



                <List
                    grid={{
                        gutter: 16,
                        column:3
                    }}
                    pagination={{
                        onChange: page => {
                           // console.log(page);
                            getImages(page,3)
                        },
                        pageSize: 3,
                        total:total
                    }}
                    dataSource={data}

                    renderItem={item => (
                        <List.Item
                            className="list-item"
                            key={item.id}
                        >
                            <Checkbox className="checkbox" checked={item.checked==1?true:false} onChange={(e)=>{onChange(e,item)}} />
                                <img src={item.url}   width={150} height={150} onClick={(e)=>{imgClick(e,item)}}   />
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
}