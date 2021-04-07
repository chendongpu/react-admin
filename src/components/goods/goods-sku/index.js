import React,{useEffect,useState} from 'react'
import {Tag, Button, Input,Checkbox,message,Popover,Modal,Select } from 'antd';
import { PlusOutlined,CloseCircleOutlined } from '@ant-design/icons';
import './index.css'
const { Option } = Select;

export default function GoodsSku(props){

    const {skus,specList,reset,onChange,onMultiSpecChange}=props;


    const [specRowRightCloseBtnHoverIndex,setSpecRowRightCloseBtnHoverIndex]=useState(-1);
    const [specs,setSpecs]=useState([]);
    const [lastSpecValuesPopoverClick,setLastSpecValuesPopoverClick]=useState({});

    const [customSpecSortShow,setCustomSpecSortShow]=useState(false);
    const [specValueIds,setSpecValueIds]=useState([]);
    const [addSpecComVisible,setAddSpecComVisible]=useState(false);


    const [AddSpecInput,setAddSpecInput]=useState({});
    const [AddSpecValueInput,setAddSpecValueInput]=useState({});





    useEffect(()=>{
    },[]);



    // 过滤掉空的sku 存在空的是为了照顾不存在规格的数据结构
    let _skus = skus.filter((sku) => {
        return sku.spec.length > 0 && sku.spec[0]['id'] !== 'undefined' && sku.spec[0].id > 0
    });

    const customSpecShow=()=> {
        setCustomSpecSortShow(true);
    };


    const mergeSkus = (spec) => {
        const _spec = spec.filter((e) => {
            return e.values.length !== 0
        });
        let skus = [];
        (function _recursive(arr1, arr2, length) {
            if (length === 0) {
                return skus.push({
                    price: null,
                    stock: null,
                    code: null,
                    spec: arr1,
                    weight: null
                });
            } else {
                for (var i = 0; i < arr2[length - 1].values.length; i++) {
                    const spec = arr2[length - 1];
                    const specValue = spec.values[i];
                    const item = {
                        id: spec.id,
                        name: spec.name,
                        value_id: specValue.id,
                        value_name: specValue.name,
                    };
                    _recursive([item, ...arr1], arr2, length - 1);
                }
            }
        })([], _spec, _spec.length);
        return skus
    };


    const onSpecSelectChange=(specId, index)=>{

        const findExistItem = specs.find((spec) => {
            return spec.id === Number(specId)
        });
        // 判断是否有重复，没重复添加
        if (findExistItem === undefined) {
            const spec = specList.find((spec) => {
                return spec.id === Number(specId)
            });
            if (!spec) {
                message.warning('商品型号不能重复')
            } else {
                const _specs = [...specs];
                _specs[index] = {
                    id: spec.id,
                    name: spec.name,
                    values: []
                };
                const data = mergeSkus(_specs);
                setSpecs(_specs);
                onChange(data);
            }
        } else {
            message.warning('商品型号不能重复')
        }
    };



    const addSpecValue = async ({ id, name }) => {
        //todo 调用添加api
        //todo 调用查询api
        setAddSpecComVisible(true);
    };


    const delSpecValue = async ({ id }) => {

        //todo 调用删除api
        //todo 调用查询api

    };



    const renderSpecValuePopoverContent=(activeItem, index)=> {


        const useModelData = specList.find((value) => {
            return Number(value.id) === Number(activeItem.id)
        });
        if (!useModelData) {
            return null;
        }
        if (!specs) {
            return null;
        }
        let cv = [];
        specs.map((item) => {
            item.values.map((e) => {
                cv.push(e.id)
            })
        });
        const useModelDataValue = useModelData.values.filter((e) => !cv.includes(e.id))
        return (

            <div className={"valuesPopoverWarp"}>
                {useModelDataValue.length > 0 ? <div className={"valuesPopoverTop"}>
                    {
                        useModelDataValue.map((tagsItem) => (
                            <div
                                key={tagsItem.id}
                                className={"valuesPopoverTopItem"}
                            >
                                <Checkbox
                                    checked={specValueIds.includes(tagsItem.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSpecValueIds([...specValueIds, tagsItem.id])

                                        } else {
                                            const _specValueIds = [...specValueIds];
                                            const _index = _specValueIds.findIndex((id) => id === tagsItem.id)
                                            _specValueIds.splice(_index, 1);
                                            setSpecValueIds(_specValueIds);
                                        }
                                    }}
                                >
                                    <Tag
                                        closable
                                        onClose={(e) => {
                                            delSpecValue({ id: tagsItem.id })
                                        }}
                                    >
                                        {tagsItem.name}
                                    </Tag>
                                </Checkbox>
                            </div>
                        ))
                    }
                </div> : null}
                <div className={"valuesPopoverMid"}>
                    {
                        addSpecComVisible ?
                            <div className={"valuesPopoverMid"} style={{ padding: '0' }}>
                                <Input
                                    style={{ width: '50%' }}
                                    placeholder='输入型号'
                                    ref={(e) => {
                                        if (e) {
                                            setAddSpecInput(e)
                                        }
                                    }}
                                />
                                <Button
                                    type="primary"
                                    size={'small'}
                                    onClick={() => {
                                        const value = AddSpecInput.input.value;
                                        if (value) {
                                            addSpecValue({
                                                id: activeItem.id,
                                                name: value
                                            })
                                        } else {
                                            message.warn('请输入型号!')
                                        }
                                    }}
                                >添加</Button>
                                <Button
                                    size={'small'}
                                    onClick={() => {
                                        setAddSpecComVisible(false);
                                    }}
                                >取消</Button>
                            </div> :
                            <a style={{ color: '#188fff' }}  onClick={() => setAddSpecComVisible(true) }>添加型号</a>
                    }
                </div>
                <div className={"valuesPopoverBot"}>
                    <Button
                        onClick={() => {
                            setLastSpecValuesPopoverClick({index, visible: false});
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        type='primary'
                        onClick={() => {
                            setLastSpecValuesPopoverClick({index, visible: false});
                            const _specs = [...specs];
                            const specIndex = specList.findIndex((spec) => spec.id === activeItem.id)
                            let specVaues = [];
                            for (let i = 0; i < specValueIds.length; i++) {
                                let findSpecValue = specList[specIndex].values.find((value) => value.id === specValueIds[i])
                                if (findSpecValue) {
                                    specVaues.push({
                                        id: findSpecValue.id,
                                        name: findSpecValue.name
                                    })
                                }
                            }
                            _specs[index].values = [...specVaues, ..._specs[index].values]
                            const data = mergeSkus(_specs);
                            this.setState({ specValueIds: [] }, () => {
                                onChange(data)
                            })
                        }}
                    >
                        确定
                    </Button>
                </div>
            </div>
        )
    };



    const addSpecItemButtom=()=> {
        return (
            <Button
                type="dashed"
               // disabled={specs[specs.length - 1].id <= 0}
                onClick={() => {
                    if (specs.length === 3) {
                        message.warning('最多添加3个型号')
                    } else {
                        onMultiSpecChange({ multi: true });
                        setSpecs( [
                            ...specs,
                            {
                                id: 0,
                                name: '',
                                values: []
                            },
                        ]);
                    }
                }}
                style={{ width: '150px', marginTop: '15px' }}
            >
                <PlusOutlined/> 添加型号分类
            </Button>
        )
    };

    const customSpecModalOk = async () => {


        //todo 调用添加api
        //todo 调用查询api
        setCustomSpecSortShow(false);

    };

    const customSpecModalCancel = () => {
        setCustomSpecSortShow(false);
    };


    const customSpecModal=()=>{
        return (
            <Modal
                style={{ top: '40%' }}
                visible={customSpecSortShow}
                title="自定义型号分类"
                onOk={customSpecModalOk}
                onCancel={customSpecModalCancel}
                footer={[
                    <Button
                        key="back"
                        size="large"
                        onClick={customSpecModalCancel}
                    >
                        取消
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        onClick={customSpecModalOk}
                    >
                        确定
                    </Button>,
                ]}
            >
                <p>请输入型号分类名称：</p>
                <Input
                    ref={(e) => {
                        if (e) {
                            setAddSpecValueInput(e);
                        }
                    }}
                />
            </Modal>
        )
    }

    console.log("specs--",specs);

    return (
        specs.length===0?<Button
                type="dashed"
                onClick={() => {
                    onMultiSpecChange({ multi: true });
                    setSpecs( {
                        id: 0,
                        name: '',
                        values: []
                    });
                }}
                style={{ width: '150px' }}
            >
                <PlusOutlined /> 添加型号分类
            </Button>
            :<div>
                <div className="itemWarp">
                    {
                        specs.length > 0 && specs.map((spec, index) => (
                            <div
                                key={spec.id}
                                className="item"
                                onMouseEnter={() => {
                                    setSpecRowRightCloseBtnHoverIndex(index);
                                }}
                                onMouseLeave={() => {
                                    setSpecRowRightCloseBtnHoverIndex(-1);
                                }}
                            >
                                <div className="itemTop">
                                    <Select
                                        placeholder="请选择型号分类"
                                        value={spec.id > 0 ? `${spec.id}` : []}
                                        style={{ width: '30%', top: '0' }}
                                        onChange={(specId) => {
                                            if (specId === 'customSpecShow') {
                                                customSpecShow()
                                            } else {
                                                onSpecSelectChange(specId, index)
                                            }
                                        }}
                                    >
                                        {specList.map((item) => (
                                            <Option key={item.id} disabled={!!specs.find((spec) => {
                                                return item.id === spec.id
                                            })}>{item.name}</Option>))}
                                        <Option key={'customSpecShow'}>自定义</Option>
                                    </Select>
                                    {
                                        specRowRightCloseBtnHoverIndex === index ?
                                            <div
                                                onClick={() => {
                                                    let _specs = [...specs];
                                                    _specs.splice(index, 1);
                                                    const data = mergeSkus(_specs);
                                                    this.setState({
                                                        specs: _specs
                                                    }, () => {
                                                        onChange(data);
                                                        if (_specs.length === 0) {
                                                            onMultiSpecChange({ multi: false })
                                                        }
                                                        if (data.length === 0) {
                                                            reset()
                                                        }
                                                    })
                                                }}
                                            >
                                                <CloseCircleOutlined style={{fontSize: '16px'}}/>
                                            </div> : null
                                    }
                                </div>
                                <div className={"tagsWarp"}>
                                    {
                                        spec.values.map((value) => (
                                            <Tag
                                                key={`spec_${spec.id}_value_${value.id}`}
                                                closable
                                                onClose={() => {
                                                    const _specs = [...specs];
                                                    _specs[index].values = _specs[index].values.filter((filterItem) => {
                                                        return filterItem.id !== value.id
                                                    })
                                                    onChange(mergeSkus(_specs))
                                                }}
                                            >
                                                {value.name}
                                            </Tag>
                                        ))
                                    }
                                    {
                                        spec.id > 0 ?
                                            <Popover
                                                content={renderSpecValuePopoverContent(spec, index)}
                                                trigger="click"
                                                placement="bottomLeft"
                                                visible={index === lastSpecValuesPopoverClick.index ? lastSpecValuesPopoverClick.visible : false}
                                            >
                                                <a style={{ color: '#188fff' }} onClick={() => {
                                                    setLastSpecValuesPopoverClick({
                                                        index,
                                                        visible: true
                                                    });
                                                }}> + 添加型号 </a>
                                            </Popover> : null
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    skus.length > 0 ?
                        <div className={"buttonWarp"}>
                            {addSpecItemButtom()}
                        </div> : addSpecItemButtom()
                }
                {/*{skus.length > 0 && <Sku skus={_skus} specs={specs} onChange={onChange} />}*/}
                {customSpecModal()}
            </div>

    );

}