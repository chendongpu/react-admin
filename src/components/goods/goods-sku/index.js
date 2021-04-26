import  React,{Component}  from 'react';
import  './spec.css'
import Sku from "./sku";
import {Modal, Select, Button, Tag, Popover, Checkbox, message, Form,Input,InputNumber} from "antd";
import { PlusOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {reqgoodsspec, reqgoodsspecadd,reqgoodsspecvalueadd,reqgoodsspecvaluedel} from "../../../api";
const confirm = Modal.confirm;
const Option = Select.Option;
const FormItem = Form.Item;

export default class GoodsSku extends Component{

    state={
        customSpecSortShow: false,
        specValueIds:[],
        addSpecComVisible:false,
        specs:[],
        lastSpecValuesPopoverClick:{index:0,visible:false}
    };

    render(){
        const {layout,skus,setSkus,specList,reset,onChange,onMultiSpecChange}=this.props;
        const {specs,lastSpecValuesPopoverClick}=this.state;

        //过滤掉空的sku
        let _skus=skus.filter((sku)=>{
            return sku.spec.length>0 && sku.spec[0]["id"]!=="undefined" &&  sku.spec[0].id>0
        });

        const checkSkus =(_, value)=>{
            // 单产品验证
            if (Array.isArray(skus) && skus.length === 1 && skus[0]['spec']!=="undefined" && skus[0].spec.length === 1 && skus[0].spec[0].id === 0) {
                if (!skus[0].price) {
                    return Promise.reject(new Error('请输入商品价格'))
                } else if (!skus[0].stock) {
                    return Promise.reject(new Error('请输入商品库存'))
                } else {
                    return Promise.resolve();
                }
            } else {
                // 多产品验证
                if( Array.isArray(skus)){
                    const index = skus.findIndex((e) => {
                        return !e.price || !e.stock
                    })
                    if (index === -1) {
                        return Promise.resolve();
                    }else{
                        return Promise.reject(new Error('请完善商品型号价格信息'))
                    }
                }else{
                    return Promise.reject(new Error('请完善商品型号价格信息'))
                }

            }

        }

        return (
          specs.length === 0 ?
              <div className="specialExplainWarp">

                  <Form.Item
                      name="skus"
                      rules={[
                          {
                              validator: checkSkus
                          },
                      ]}
                  >
                  <FormItem
                      {...layout}
                      label='商品价格'
                      required={true}
                  >
                      <InputNumber
                          style={{
                              width: 150
                          }}
                          precision={2}
                          formatter={value => `${value}`}
                          min={0}
                          value={skus[0].price}
                          onChange={(e) => {
                              setSkus([{
                                  ...skus[0],
                                  price: e
                              }])
                          }}
                      /> 元
                  </FormItem>
                  <FormItem
                      {...layout}
                      label='库存'
                      required={true}
                  >
                      <InputNumber
                          style={{ width: 150 }}
                          precision={0}
                          formatter={value => `${value}`}
                          min={0}
                          value={skus[0].stock}
                          onChange={(e) => {
                              setSkus([{
                                  ...skus[0],
                                  stock: e
                              }])
                          }}
                      /> 件
                  </FormItem>
                  <FormItem
                      {...layout}
                      label='商品编码'
                  >
                      <Input
                          style={{ width: 440 }}
                          placeholder="选填，用于商家系统对接"
                          value={skus[0].code}
                          onChange={(e) => {
                              setSkus([{
                                  ...skus[0],
                                  code: e.target.value
                              }])
                          }}
                      />
                  </FormItem>
                  <FormItem
                      {...layout}
                      label='商品型号'
                  >
                <Button type="dashed" onClick={()=>{
                    this.props.onMultiSpecChange({multi:true});
                    this.setState({
                        specs:[{
                            id:0,name:'',values:[]
                        }]
                    })
                }}> <PlusOutlined /> 添加型号分类</Button></FormItem></Form.Item></div>:

              <div className="specialExplainWarp">
              <Form.Item
                  name="skus"
                  rules={[
                      {
                          validator: checkSkus
                      },
                  ]}
              >
              <FormItem
                  {...layout}
                  label='商品型号'
              >
              <div className="spec view">
                  <div className="itemWarp view">
                      {
                          specs.length>0 && specs.map((spec,index)=>(
                              <div key={spec.id} className="item">
                                  <div className="itemTop view">
                                      <Select
                                          placeholder="请选择型号分类"
                                          value={spec.id>0?`${spec.id}`:[] }
                                          style={{ width: '30%', top: '0' }}
                                            onChange={(specId)=>{
                                                if(specId === 'customSpecShow'){
                                                    this.customSpecShow();
                                                }else{
                                                    this.onSpecSelectChange(specId,index);
                                                }
                                            }}
                                      >
                                          {
                                              specList.map((item)=>(<Option key={item.id} disabled={!!specs.find((spec)=>{return item.id === spec.id})}>{item.name}</Option>))
                                          }
                                          <Option key={'customSpecShow'}>自定义</Option>
                                      </Select>


                                              <div onClick={()=>{
                                                  confirm({
                                                      title:'确定要删除吗',
                                                      okText:'删除',
                                                      okType:'danger',
                                                      cancelText:'取消',
                                                      onOk:()=>{
                                                       let _specs=[...specs];
                                                       _specs.splice(index,1);
                                                       const data=this.mergeSkus(_specs);
                                                       this.setState({
                                                           specs:_specs
                                                       },()=>{
                                                           onChange();
                                                           if(_specs.length===0){
                                                               onMultiSpecChange({multi: false})

                                                           }
                                                           setSkus(data);

                                                           if(data.length === 0){
                                                               reset()
                                                           }
                                                       })
                                                      }
                                                  })
                                              }}>
                                                  <CloseCircleOutlined style={{fontSize: '16px'}}/>
                                              </div>

                                  </div>

                                  <div className="tagsWarp view">
                                      {
                                          spec.values.map((value)=>(
                                              <Tag
                                                  key={`spec_${spec.id}_value_${value.id}`}
                                                  closable
                                                  onClose={()=>{
                                                      const _specs=[...specs];
                                                      _specs[index].values=_specs[index].values.filter((filterItem)=>{
                                                          return filterItem.id!==value.id;
                                                      });
                                                      onChange(this.mergeSkus(_specs));
                                                  }}
                                              >
                                                  {value.name}
                                              </Tag>
                                          ))
                                      }
                                      {
                                          spec.id>0?
                                              <Popover
                                                  content={this.renderSpecValuePopoverContent(spec,index)}
                                                  trigger="click"
                                                  placement="bottomLeft"
                                                  visible={index === lastSpecValuesPopoverClick.index?lastSpecValuesPopoverClick.visible:false}
                                              >
                                                  <a style={{color:'#188fff'}} onClick={()=>{
                                                      this.setState({
                                                          lastSpecValuesPopoverClick:{
                                                              index,visiable:true
                                                          }
                                                      })
                                                  }}>
                                                      +添加型号
                                                  </a>
                                              </Popover>:null
                                      }
                                  </div>
                              </div>
                          ))
                      }
                  </div>
                  {skus.length>0?
                    <div className="buttonWarp">
                        {this.addSpecItemButton()}
                    </div>:this.addSpecItemButton()
                  }
                  {skus.length > 0 && <Sku skus={_skus} specs={specs} onChange={onChange} />}
                  {this.customSpecModal()}
              </div>
              </FormItem>
              </Form.Item>
              </div>
        );
    }

    customSpecShow(){
        this.setState({customSpecSortShow:true});
    }
    onSpecSelectChange(specId,index){
        const {specList,onChange}=this.props;
        const {specs}=this.state;
        const findExistItem = specs.find((spec)=>{
            return spec.id===Number(specId);
        })
        //判断是否有重复，没重复添加
        if(findExistItem===undefined){
            const spec = specList.find((spec)=>{
                return spec.id === Number(specId);
            })
            if(!spec){
                message.warn('商品型号不能重复');
            }else{
                const _specs=[...specs];
                _specs[index]={
                    id:spec.id,
                    name:spec.name,
                    values:[]
                };
                const data=this.mergeSkus(_specs);
                this.setState({specs:_specs});
                onChange(data);
            }
        }else{
            message.warning('商品型号不能重复')
        }
    }

    AddSpecInput = {input:{value:null}};
    AddSpecValueInput ={input:{value:null}};

    renderSpecValuePopoverContent(activeItem,index){
        const {specList,onChange}=this.props;
        const {specValueIds,specs,addSpecComVisible}=this.state;

        const useModelData=specList.find((value)=>{
            return Number(value.id)===Number(activeItem.id);
        });
        if (!useModelData){
            return null;
        }
        if(!specs){
            return null;
        }
        let cv=[];
        specs.map((item)=>{
            item.values.map((e)=>{
                cv.push(e.id)
            })
        })
        const useModelDataValue=useModelData.values.filter((e)=>!cv.includes(e.id));
        return (
            <div className="valuesPopoverWarp view">
                {useModelDataValue.length>0?<div className="valuesPopoverTop view">
                        {
                            useModelDataValue.map((tagsItem)=>(
                                <div
                                    key={tagsItem.id}
                                    className="valuesPopoverTopItem view">
                                    <Checkbox
                                        checked={specValueIds.includes(tagsItem.id)}
                                        onChange={(e)=>{
                                            if(e.target.checked){
                                                this.setState({specValueIds:[...specValueIds,tagsItem.id]})
                                            }else {
                                                const _specValueIds=[...specValueIds];
                                                const _index=_specValueIds.findIndex((id)=>id===tagsItem.id)
                                                _specValueIds.splice(_index,1);
                                                this.setState({specValueIds:_specValueIds})
                                            }

                                        }}
                                    >
                                        <Tag
                                            closable
                                            onClose={(e)=>{
                                                confirm({
                                                    title:'确定要删除吗',
                                                    okText:'删除',
                                                    okType:'danger',
                                                    cancelText:'取消',
                                                    onOk:()=>{
                                                        this.delSpecValue({id:tagsItem.id});
                                                    }

                                                })
                                            }}
                                            >
                                            {tagsItem.name}
                                        </Tag>
                                    </Checkbox>
                                </div>
                            ))
                        }
                    </div>:null }
                <div className="valuesPopoverMid">
                    {
                        addSpecComVisible?
                            <div className="valuesPopoverMid" style={{padding:'0'}}>
                                <Input style={{width:'50%'}} placeholder="输入型号" ref={(e)=>{
                                    if(e){
                                    this.AddSpecInput=e;
                                    }
                                }} />

                                <Button type="primary" size={'small'} onClick={()=>{
                                const value=this.AddSpecInput.input.value;
                                if(value){
                                    this.addSpecValue({id:activeItem.id,name:value});
                                }else{
                                    message.warning("请输入型号");
                                }
                                }}>添加</Button>
                                <Button size={'small'} onClick={()=>{this.setState({addSpecComVisible:false})}} >取消</Button>
                            </div>:
                            <a style={{color:'#188fff'}} onClick={()=>{this.setState({addSpecComVisible:true})}}>添加型号</a>
                    }
                </div>

                <div className="valuesPopoverBot">
                    <Button
                        onClick={()=>{this.setState({lastSpecValuesPopoverClick:{index,visible: false}})}}
                    >取消</Button>
                    <Button type="primary"
                        onClick={()=>{
                            this.setState({lastSpecValuesPopverClick:{index,visiable:false}})
                            const _specs=[...specs];
                            const specIndex=specList.findIndex((spec)=>spec.id===activeItem.id);
                            let specValues=[];
                            for(let i=0;i<specValueIds.length;i++){
                                let findSpecValue=specList[specIndex].values.find((value)=>value.id===specValueIds[i]);
                                if(findSpecValue){
                                    specValues.push({
                                        id:findSpecValue.id,
                                        name:findSpecValue.name
                                    })
                                }
                            }
                            _specs[index].values=[...specValues,..._specs[index].values];
                            const data=this.mergeSkus(_specs);
                            this.setState({specValueIds:[]},()=>{onChange(data)});

                        }}
                    >
                    确定
                    </Button>
                </div>

            </div>
        )
    }

    //添加
    addSpecValue=async({id,name})=>{
        const {setSpecList}=this.props;
        const response = await reqgoodsspecvalueadd({spec_id:id,name:name});
        if(response.code===0) {

            const res = await reqgoodsspec({});
            if(res.code===0){
                setSpecList(res.result.list);
                this.setState({ addSpecComVisible: false })
            }else{
                message.error(res.msg);
            }

        }else{
            message.error(response.msg);
        }
    };


    delSpecValue=async({id})=>{
        const {setSpecList}=this.props;
        const response = await reqgoodsspecvaluedel({id:id});
        if(response.code===0) {

            const res = await reqgoodsspec({});
            if(res.code===0){
                setSpecList(res.result.list);
            }else{
                message.error(res.msg);
            }

        }else{
            message.error(response.msg);
        }
    };

    addSpecItemButton(){
        const {specs}=this.state;
        return (
            <Button
                type="dashed"
                disabled={specs[specs.length-1].id<=0}
                onClick={()=>{
                    if(specs.length===3){
                        message.warning("最多添加3个型号")
                    }else{
                        this.props.onMultiSpecChange({multi:true});
                        this.setState({
                            specs:[
                                ...specs,
                                {
                                    id:0,name:'',values:[]
                                }
                            ]
                        })
                    }
                }}
                style={{width:'150px',marginTop:'15px'}}
            >
                <PlusOutlined/> 添加型号分类
            </Button>
        );
    }

    customSpecModal(){
        return (
            <Modal style={{top:'40%'}}
                   visible={this.state.customSpecSortShow}
                   title="自定义型号分类"
                   onOk={this.customSpecModalOk}
                   onCancel={this.customSpecModalCancel}
                   footer={[<Button key="back" size="large" onClick={this.customSpecModalCancel}>取消</Button>,
                       <Button key="submit" type="primary" size="large" onClick={this.customSpecModalOk}>确定</Button>]}
            >
                <p>请输入型号分类名称:</p>
                <Input ref={(e)=>{
                    if(e){
                        this.AddSpecValueInput=e;
                    }
                }} />
            </Modal>
        );
    }




    customSpecModalOk=async()=>{
        const {setSpecList}=this.props;
        const response = await reqgoodsspecadd({name:this.AddSpecValueInput.input.value});

        if(response.code===0){
            const res = await reqgoodsspec({});
            if(res.code===0){
                setSpecList(res.result.list);
            }else{
                message.error(res.msg);
            }

        }else{
            message.error(response.msg);
        }
    };

    customSpecModalCancel=()=>{
        this.setState({customSpecSortShow:false});
    };

    mergeSkus = (specs)=>{
        const _spec=specs.filter((e)=>{
            return e.values.length !== 0
        });

        let skus=[];
        (function _recursive(arr1,arr2,length){
            if(length === 0){
                return skus.push({price:null,stock:null,code:null,spec:arr1,weight:null});
            }else{
                for(var i=0;i<arr2[length-1].values.length;i++){
                    const spec=arr2[length-1];
                    const specValue=spec.values[i];
                    const item={id:spec.id,price:spec.name,value_id:specValue.id,value_name:specValue.name};
                    _recursive([item,...arr1],arr2,length-1);
                }
            }
        })([],_spec,_spec.length);
        return skus;

    }


}