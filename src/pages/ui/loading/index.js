import React,{Component} from 'react'
import {Card, Spin, Icon, Alert } from 'antd'
import './index.less'

class Loading extends Component {
  state = {
  }
  handleClick=(type)=>{
    this.setState({
      [type]: true,
    });
  }
 
  render(){
    const icon = <Icon type="loading" style={{fontSize:24}}/>
    return (
      <div className="uiButton">
        <Card title="spin用法" className="cardWarp">
          <Spin size="small" />  
          <Spin style={{margin:'0 10px'}} />  
          <Spin size="large" style={{margin:'0 10px'}}/> 
          <Spin indicator={icon}></Spin> 
        </Card>
        <Card title="内容遮罩" className="cardWarp">
          <Alert message="学习React" description="如何学好react,要不断练习哦" type="info"/> 
          <Alert message="学习React" description="如何学好react,要不断练习哦" type="warning"/> 
          <Spin>
            <Alert message="学习React" description="如何学好react,要不断练习哦" type="warning"/> 
          </Spin>
          <Spin tip="加载中..." indicator={icon}>
            <Alert message="学习React" description="如何学好react,要不断练习哦" type="info"/> 
          </Spin>
        </Card>
        


        

      </div>
    );
  }
}

export default Loading