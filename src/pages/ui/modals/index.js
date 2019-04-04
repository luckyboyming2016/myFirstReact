import React,{Component} from 'react'
import {Card, Button, Modal} from 'antd'
import './index.less'

class Modals extends Component {
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false
  }
  handleClick(type){
    this.setState({
      [type]: true,
    });
  }
  handleConfirm(type){
    Modal[type]({
      title: '你确认',
      content: '你好笨呀，这都不会',
     onOk(){
       console.log('点击确认');
     },
     onCancel(){
       console.log('点击取消');
     },
     okText: '确认',
    cancelText: '取消'
    })
  }
  render(){
    return (
      <div className="uiButton">
        <Card title="基础模态框" className="cardWarp">
          <Button type="primary" onClick={()=>this.handleClick('showModal1')}>open</Button>
          <Button onClick={()=>this.handleClick('showModal2')}>自定义页脚</Button>
          <Button type="dashed" onClick={()=>this.handleClick('showModal3')}>顶部20px</Button>
          <Button type="danger" onClick={()=>this.handleClick('showModal4')}>水平垂直居中</Button>
        </Card>
        <Card title="信息确认框" className="cardWarp">
          <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>confirm</Button>
          <Button onClick={()=>this.handleConfirm('info')}>info</Button>
          <Button type="dashed" onClick={()=>this.handleConfirm('error')}>error</Button>
          <Button type="danger" onClick={()=>this.handleConfirm('success')}>success</Button>
        </Card>
        <Modal
          title="温馨提示"
          visible={this.state.showModal1}
          onOk={()=>{this.setState({
            showModal1: false
          })}}
          onCancel={()=>{this.setState({
            showModal1: false
          })}}
        >
          <p>Some contents...</p>
        </Modal>
        <Modal
          title="提示"
          cancelText="取消"
          okText="好的"
          visible={this.state.showModal2}
          onOk={()=>{this.setState({
            showModal2: false
          })}}
          onCancel={()=>{this.setState({
            showModal2: false
          })}}
        >
          <p>提示文字</p>
        </Modal>
        <Modal style={{top:20}}
          title="提示"
          visible={this.state.showModal3}
          onOk={()=>{this.setState({
            showModal3: false
          })}}
          onCancel={()=>{this.setState({
            showModal3: false
          })}}
        >
          <p>顶部20px</p>
        </Modal>
        < Modal wrapClassName="vertical-center-modal"
          title="提示"
          visible={this.state.showModal4}
          onOk={()=>{this.setState({
            showModal4: false
          })}}
          onCancel={()=>{this.setState({
            showModal4: false
          })}}
        >
          <p>水平居中</p>
        </Modal>
      </div>
    );
  }
}

export default Modals