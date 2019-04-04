import React, { Component } from 'react'
import {Row,Col, Card, Modal } from 'antd'
import './index.less'
const { Meta } = Card;
class Gallery extends Component {
  state = {
    visible: false
  }
  showImg=(imgSrc)=>{
    this.setState({
      newImg: '/assets/gallery/' + imgSrc,
      visible: true
    })
  }
  render(){
    const imgs = [
      ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
      ['6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg'],
      ['11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'],
      ['16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'],
      ['21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg']
    ];
    const imgList = imgs.map((list) => list.map((item,index) => 
        <Card key={index} style={{marginBottom:10}} cover={<img alt="example" onClick={()=>this.showImg(item)} src={'/assets/gallery/'+item} />}>
          <Meta title="Europe Street beat" description="www.instagram.com"/>
        </Card>
      ))

    return (
      <div className="uiButton gallery">
        <Row gutter={10}> 
          <Col span={5}>{imgList[0]}</Col>
          <Col span={5}>{imgList[1]}</Col>
          <Col span={5}>{imgList[2]}</Col>
          <Col span={5}>{imgList[3]}</Col>
          <Col span={4}>{imgList[4]}</Col>
        </Row>
        <Modal title="图片画廊" onCancel={()=>{this.setState({visible: false})}} footer={null} visible={this.state.visible}>
            {<img alt="" src={this.state.newImg} />}
        </Modal>
      </div>
    );
  }
}

export default Gallery