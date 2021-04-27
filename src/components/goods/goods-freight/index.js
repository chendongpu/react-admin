import React, { Component } from "react";
import { Select, Radio, InputNumber, Form, Button, DatePicker } from "antd";
import "./index.css"
import { Link } from "react-router-dom";
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;


export default class GoodsFreight extends Component{

    state = {
        loading: false,
        freight_id: null,
        freight: 0,
    }

    render() {
        const {getFieldDecorator, layout, shippingTemplateList, shippingCostSelect, refreshShippingTemplateList, freight_fee, sale_time} = this.props;
        const { loading, freight_id } = this.state
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className="goodsItem">
                <h3>运费其他</h3>
                <FormItem
                    {...layout}
                    label='运费'
                    name="freightData"
                >
                    <RadioGroup
                        onChange={(e) => {
                            const { value } = e.target
                            this.setState({ shippingCostSelect: value })
                        }}
                        value={shippingCostSelect}
                    >
                        <Radio value={'freight'} style={radioStyle}>
                            统一邮费
                            {shippingCostSelect === 'freight' ? <InputNumber
                                placeholder="请输入"
                                style={{
                                    width: 150,
                                    marginLeft: 20,
                                }}
                                formatter={value => `￥ ${value}`}
                                min={0}
                                precision={2}

                                onChange={(e) => {
                                    this.setState({ freight: e })
                                }}
                            /> : null}
                        </Radio>
                        <Radio value={'freight_id'} style={{ ...radioStyle, marginTop: 20, display: 'none' }}>
                            运费模板
                            {shippingCostSelect === 'freight_id' ? [<Select
                                    showSearch
                                    style={{ width: 440, marginLeft: 20 }}
                                    placeholder="请选择"
                                    optionFilterProp="children"
                                    onChange={(value) => {
                                        this.setState({
                                            freight_id: value
                                        })
                                    }}
                                    value={freight_id}
                                    filterOption={(input, option) => option.props.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        shippingTemplateList.map((e) => (
                                            <Option value={e.id} key={e.id}>
                                                <p>{e.name}</p>
                                            </Option>
                                        ))
                                    }
                                </Select>,
                                    <Button
                                        type="primary"
                                        style={{
                                            marginLeft: 10
                                        }}
                                        size={'small'}
                                        loading={loading}
                                        onClick={() => {
                                            this.setState({
                                                loading: true
                                            }, () => {
                                                refreshShippingTemplateList(() => {
                                                    this.setState({
                                                        loading: false
                                                    })
                                                })
                                            })
                                        }}
                                    >
                                        刷新
                                    </Button>,
                                    <Link
                                        style={{
                                            marginLeft: 10
                                        }}
                                        to={'/setting/freightAdd'}
                                        target={'_blank'}
                                    >
                                        新增运费模板
                                    </Link>]
                                : null}
                        </Radio>
                    </RadioGroup>
                </FormItem>
            </div>
        );
    }
}