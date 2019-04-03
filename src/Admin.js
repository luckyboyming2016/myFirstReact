import React, { Component } from 'react'
import { Row,Col } from 'antd'
import 'antd/dist/antd.css'
import './style/css/common.less'
import Header from './components/Header'
import Home from './pages/home'
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
              <Home />
            </Row>
            <Footer />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin