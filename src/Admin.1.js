import React, { Component } from 'react'
import {Row,Col,Affix } from 'antd'
import 'antd/dist/antd.css'
import './style/css/common.less'
import Header from './components/Header'
// import Home from './pages/home'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft';


class Admin extends Component {
  state = {
    top: 0
  }
 
  componentWillMount(){
    this.setState({
      top: this.state.top
    })
  }
  render(){
    return (
      <div className="container">
        <Row className="nav-left">
          <Col span={4} className="menu">
            <NavLeft />
          </Col>
          <Col span={20} className="right-content">
            <Affix offsetTop={this.state.top}>
              <Header />
            </Affix>
            <Row className="main bgfff">
              {/* <Home /> */}
              { this.props.children }
            </Row>
            <Footer />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin