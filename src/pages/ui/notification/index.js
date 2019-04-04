import React,{Component} from 'react'
import {Card,Button, notification } from 'antd'
import './index.less'

class Notification extends Component {
  state = {
  }
  openNotification = (type,direction) => {
    if(direction){
      notification.config({
        placement: direction
      })
    }
    notification[type]({
      message: '上个月工资',
      description: '小样，发工资了，你上个月实发1000，现在就给你100，你想怎么样' 
    })
  }
  render(){
    return (
      <div className="uiButton">
        <Card title="通知提醒框" className="cardWarp">
          <Button type="primary" onClick={()=>this.openNotification('success')}>点击success</Button>
          <Button type="primary" onClick={()=>this.openNotification('error')}>error点击</Button>
          <Button type="primary" onClick={()=>this.openNotification('info')}>点击info</Button>
          <Button type="primary" onClick={()=>this.openNotification('warn')}>点击warn</Button>
        </Card>
        <Card title="提醒框方向" className="cardWarp">
          <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>点击success</Button>
          <Button type="primary" onClick={()=>this.openNotification('error','topRight')}>error点击</Button>
          <Button type="primary" onClick={()=>this.openNotification('info','bottomLeft')}>点击info</Button>
          <Button type="primary" onClick={()=>this.openNotification('warn','bottomRight')}>点击warn</Button>
        </Card>
      </div>
    );
  }
}

export default Notification