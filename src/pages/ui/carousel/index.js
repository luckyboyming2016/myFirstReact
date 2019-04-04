import React, { Component } from 'react'
import { Carousel, Card  } from 'antd'
import './index.less'

class Carousels extends Component {
  state = {
    visible: false
  }
 
  render(){
    return (
      <div className="uiButton">
        <Card title="文字轮播" className="cardWarp">
          <Carousel autoplay>
            <div><h3>你还没学会react</h3></div>
            <div><h3>你怎么这么水呢，看文档呀</h3></div>
            <div><h3>看了文档还要真实操作敲码呀</h3></div>
            <div><h3>敲了码要真实对接项目呀，要灵活运用</h3></div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className="slide-wrap">
          <div style={{width:500, height:300}}>
            <Carousel autoplay effect="fade" >
              <div><img alt="" src={'/assets/gallery/10.jpg'} /></div>
              <div><img alt="" src={'/assets/gallery/14.jpg'} /></div>
              <div><img alt="" src={'/assets/gallery/15.jpg'} /></div>
              <div><img alt="" src={'/assets/gallery/6.jpg'} /></div>
            </Carousel>
          </div>
          
        </Card>
      </div>
    );
  }
}

export default Carousels