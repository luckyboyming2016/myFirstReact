import React, { Component } from 'react'
import { Row,Col } from 'antd'
import 'antd/dist/antd.css'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft';


class Admin extends Component {
  render(){
    return (
      <div>
        <Row>
          <Col span="3">
            <NavLeft />
          </Col>
          <Col span="4">
            <Header />
            <Row>
              <Col>
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