import React,{Component} from 'react'
import {Card,Button, message } from 'antd'
import './index.less'


class Messages extends Component {
  state = {
  }
  showMsg=(type)=>{
    message[type]('恭喜你，你成功了')
  }
  render(){
    return (
      <div className="uiButton">
        <Card title="全局提示框" className="cardWarp">
          <Button type="primary" onClick={()=>this.showMsg('success')}>点击success</Button>
          <Button type="primary" onClick={()=>this.showMsg('info')}>Infor</Button>
          <Button type="primary" onClick={()=>this.showMsg('warning')}>点击Warning</Button>
          <Button type="primary" onClick={()=>this.showMsg('error')}>点击Error</Button>
          <Button type="primary" onClick={()=>this.showMsg('loading')}>点击Loading</Button>
        </Card>
      </div>
    );
  }
}

export default Messages