import React,{ Component } from 'react'
import { Row,Col } from 'antd'
import Until from '../../config/until.js'
import "./index.less"

class Header extends Component {
  componentWillMount(){
    this.setState({
      username: '张三'
    })
    this.getWeather()
    setInterval(() => {
      let getCurrentTime = Until.formate(new Date().getTime())
      this.setState({
        getCurrentTime
      })
    }, 1000);
  }
  getWeather(){
    //测试地址 ：http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2
  }
  render(){
    return (
      <div className="headTop bgfff pr">
        <Row className="header-top text-right">
          <Col span={24}>欢迎 {this.state.username}<a href="##">退出</a></Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="bread-title text-center">首页</Col>
          <Col className="weather text-right" span={20}>{ this.state.getCurrentTime } <span>晴转多云</span></Col>
        </Row>
      </div>
    )
  }
}

export default Header