import  React,{Component}  from 'react';
import  './spec.css'
import { Modal, Input, Select, Button, Tag, Popover, Checkbox, message } from "antd";
import {reqgoodsspec, reqgoodsspecadd,reqgoodsspecvalueadd,reqgoodsspecvaluedel} from "../../../api";
const confirm = Modal.confirm;
const Option = Select.Option;

export default class GoodsSku extends Component{

    state={
        customSpecSortShow: false,
        specValueIds:[],
        addSpecComVisible:false,
        specRowRightCloseBtnHoverIndex:-1,
        specs:[],
        lastSpecValuesPopoverClick:{index:0,visible:false}
    };

    render(){
        const {skus,setSkus,specList,reset,onChange,onMultiSpecChange}=this.props;
        const {specRowRightCloseBtnHoverIndex,specs,lastSpecValuesPopoverClick}=this.state;
        //过滤掉空的sku
        console.log("skus:",skus);
        let _skus=skus.filter((sku)=>{
            return sku.spec.length>0 && sku.spec[0]["id"]!=="undefined" &&  sku.spec[0].id>0
        });
        console.log("specs",specs);
        return (
          specs.length === 0 ?
                <Button type="dashed" onClick={()=>{
                    this.props.onMultiSpecChange({multi:true});
                    this.setState({
                        specs:[{
                            id:0,name:'',values:[]
                        }]
                    })
                }}>添加型号分类</Button>:
              <div className="spec view">
                  <div className="itemWarp view">
                      {
                          specs.length>0 && specs.map((spec,index)=>(
                              <div key={spec.id} className="item" onMouseEnter={()=>{
                                  this.setState({ specRowRightCloseBtnHoverIndex: index })
                              }} onMouseLeave={()=>{
                                  this.setState({ specRowRightCloseBtnHoverIndex: -1 })
                              }}>
                                  <div className="itemTop view">
                                      <Select
                                          placeholder="请选择型号分类"
                                          value={spec.id>0?`${spec.id}`:[] }
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

                                      {
                                          specRowRightCloseBtnHoverIndex===index?
                                              <div onClick={()=>{
                                                  confirm({
                                                      title:'确定要删除吗',
                                                      okText:'删除',
                                                      okType:'danger',
                                                      cancelText:'取消',
                                                      onOk:()=>{
                                                       let _specs=[...specs];
                                                       console.log("11111_specs",_specs);
                                                       _specs.splice(index,1);
                                                       console.log("22222_specs",_specs);
                                                       const data=this.mergeSkus(_specs);
                                                          console.log("111_data",data);
                                                       this.setState({
                                                           specs:_specs
                                                       },()=>{
                                                           onChange();
                                                           console.log("333_specs",_specs);
                                                           if(_specs.length===0){
                                                               console.log("加加加");
                                                               onMultiSpecChange({multi: false})


                                                           }
                                                           setSkus(data);

                                                           if(data.length === 0){
                                                               console.log("走走走");
                                                               reset()
                                                           }
                                                       })
                                                      }
                                                  })
                                              }}>
                                                  删除
                                              </div>:null
                                      }
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
                                                  <a style={{color:'#00f'}} onClick={()=>{
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
                  {this.customSpecModal()}
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
                                <Button size={'small'} onClick={()=>{this.setState({addSpecComVisible:false})}} ></Button>
                            </div>:
                            <a style={{color:'#00f'}} onClick={()=>{this.setState({addSpecComVisible:true})}}>添加型号</a>
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
            console.log("请求成功", response);
            console.log(response);

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
            console.log("请求成功", response);
            console.log(response);

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
                +添加型号分类
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
            console.log("请求成功",response);
            console.log(response);

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
        console.log("aaa--specs",specs);
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