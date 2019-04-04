import React,{Component} from 'react'
import {Card, Button,Radio } from 'antd'
import './index.less'
const ButtonGroup = Button.Group
const RadioGroup = Radio.Group
class Buttons extends Component {
  state = {
    size: 'default'
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      size: e.target.value,
    });
  }
  render(){
    return (
      <div className="uiButton">
        <Card title="基础按钮" className="cardWarp">
          <Button type="primary">测试</Button>
          <Button>测试</Button>
          <Button type="dashed">测试</Button>
          <Button type="disabled">测试</Button>
          <Button type="danger">测试</Button>
        </Card>
        <Card title="图形按钮" className="cardWarp">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search" disabled></Button>
          <Button icon="search">搜索</Button>
          <Button icon="download">搜索</Button>
        </Card>
        <Card title="按钮组" style={{marginRight:0, marginBottom:10}}>
          <ButtonGroup>
            <Button icon="left" type="primary">返回</Button>
            <Button icon="right" type="primary">下一步</Button>
          </ButtonGroup>
        </Card>
        <Card title="按钮尺寸" className="cardWarp">
          <RadioGroup onChange={this.onChange} value={this.state.size}>
            <Radio value="small">A</Radio>
            <Radio value="default">B</Radio>
            <Radio value="large">C</Radio>
          </RadioGroup>
          <Button type="primary" size={this.state.size}>小</Button>
          <Button type="dashed" size={this.state.size}>中</Button>
          <Button type="danger" size={this.state.size}>大</Button>
        </Card>
      </div>
    );
  }
}

export default Buttons