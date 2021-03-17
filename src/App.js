import React,{Component} from 'react';
import {Button,message} from 'antd';

export default class App  extends Component{
    handleClick=()=>{
        message.success("asa");
    }
  render(){
    return <Button type="primary" onClick={this.handleClick} >
        primary
    </Button>
  }
}

