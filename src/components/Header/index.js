import React,{ Component } from 'react'
import { Row,Col } from 'antd'
import Until from '../../config/until.js'
import Axios from '../../jsonp'
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
    let city = '北京'
    Axios.JSONP({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then(res=>{
      if(res.status === 'success'){
        let data = res.results[0].weather_data[0]
        this.setState({
          dayImg: data.dayPictureUrl,
          dayMsg: data.weather,
          dayWind: data.wind
        })
      }
    })
  }
  render(){
    return (
      <div className="headTop bgfff pr">
        <Row className="header-top text-right">
          <Col span={24}>欢迎 {this.state.username}<a href="##">退出</a></Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="bread-title text-center">首页</Col>
          <Col className="weather text-right" span={20}>{ this.state.getCurrentTime } 
            <span className="weather-img"><img alt="" src={this.state.dayImg}/></span>
            <span className="weather-day">{this.state.dayMsg}</span>
            <span className="weather-msg">{this.state.dayWind}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Header