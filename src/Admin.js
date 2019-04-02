import React, { Component } from 'react'
import { Row,Col } from 'antd'
import 'antd/dist/antd.css'
import './style/css/common.less'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft';


class Admin extends Component {
  render(){
    return (
      <div className="container">
        <Row className="nav-left">
          <Col span={4} className="menu">
            <NavLeft />
          </Col>
          <Col span={20} className="right-content">
            <Header />
            <Row className="main bgfff">
              <Col span={24}>
                中间内容12
              </Col>
            </Row>
            <Footer />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin