import React,{useEffect,useState} from 'react'
import {Modal, List, Checkbox, message} from 'antd';
import './index.css'
import { reqimage} from "../../../api";


export default function ImagePicker(props){


    const {visible,closeHandler,setImages}=props;

    const [data,setData]=useState([]);
    const [total,setTotal]=useState(0);
    const [imgs,setImgs]=useState([]);


    const onOK=()=>{
        console.log("ok click")

    };

    const imgClick=(e,item)=>{
        console.log("imgClick click");
        console.log("imgClick click",e.target.src);
        console.log("item",item);
        let tmp = data.map((d)=>{
           if(item.id===d.id){
             d.checked=(d.checked===1)?0:1;
             return d;
           }else{
               return d;
           }
        });
        setData(tmp);

      // images.push(e.target.src);

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
       getImages(1,3);
    },[visible]);

    const onChange=(e,item)=> {
        console.log(`checked = ${e.target.checked}`);
        console.log("item",item);

        let tmp = data.map((d)=>{
            if(item.id===d.id){
                d.checked=(d.checked===1)?0:1;
                return d;
            }else{
                return d;
            }
        });
        setData(tmp);
    };

    return (

        <div>
            <Modal  forceRender title="Basic Modal"  visible={visible} onOk={onOK} onCancel={closeHandler}>

                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
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
                                <img src={item.url}   width={100} height={100} onClick={(e)=>{imgClick(e,item)}}   />
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
}