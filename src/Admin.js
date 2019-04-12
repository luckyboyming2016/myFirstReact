import React, { Component } from 'react'
import {Layout, Affix } from 'antd'
import 'antd/dist/antd.css'
import './style/css/common.less'
import Header from './components/Header'
// import Home from './pages/home'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft';
const { Sider } = Layout

class Admin extends Component {

  state = {
    top: 0,
    collapsed: false //初始状态
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed
    });
  }
  componentWillMount(){
    this.setState({
      top: this.state.top
    })
  }
  render(){
    return (
      <Layout className="adminWrap">
        <Sider className="adminNavleft" style={{overflow: 'auto', height: '100vh', position: 'relative', left: 0}}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <NavLeft />
        </Sider>
        <Layout>
          <Affix offsetTop={this.state.top}>
            <div className="bgfff">
              <Header/>
            </div>
          </Affix>
          <div className="main bgfff">
            {/* <Home /> */}
            { this.props.children }
          </div>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}

export default Admin