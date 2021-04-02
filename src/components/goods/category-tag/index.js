import React, {useEffect, useState} from 'react'
import { TreeSelect } from 'antd';
import {Menu} from "antd/lib/menu";
import {Link} from "react-router-dom";
const { TreeNode } = TreeSelect;

export  default function CategoryTag(props){
    const {categorys}=props;

    const [value,setValue]=useState([]);

    const onChange = val => {
        console.log(val);
        setValue(val);
    };

    const getTreeNode=(cats)=>{
        return cats.map((item)=>{
            if(!item._child){
                return (
                    <TreeNode value={`${item.id}`} title={item.name} key={item.id} />
                );
            }else{
                return (
                    <TreeNode value={`${item.id}`} title={item.name} key={item.id}>
                        {getTreeNode(item._child)}
                    </TreeNode>
                );
            }

        })
    };

    return (
        <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChange}
        >
            {getTreeNode(categorys)}
        </TreeSelect>
    );
}




