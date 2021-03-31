import React, {useEffect, useState} from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.css'



export  default function PicturesWall(props){

    const {fl,selectImage,setImages}=props;
    const [previewVisible,setPreviewVisible]=useState(false);
    const [previewImage,setPreviewImage]=useState("");
    const [previewTitle,setPreviewTitle]=useState("");


    const handleCancel = () => {setPreviewVisible(false)};

    const  getBase64=(file)=>{
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleRemove = async file => {
        let tmp=fl.filter((f)=>{
            if(f.uid!==file.uid){
                return f;
            }
        });
        setImages(tmp)

    };



    useEffect(()=>{
    },[previewVisible]);

        const uploadButton = (
            <div className="selectImage"  onClick={()=>{
               selectImage();
            }}>
                <div style={{marginLeft:'auto',marginRight:'auto'}}>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                </div>
            </div>
        );
        return (
            <div>
                <Upload
                    listType="picture-card"
                    fileList={fl}
                    onPreview={handlePreview}
                    onRemove={handleRemove}
                    openFileDialogOnClick={false}
                >
                    {uploadButton}
                </Upload>


                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );

}
