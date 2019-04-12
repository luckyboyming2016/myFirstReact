import React, { Component } from 'react'
import './style/css/common.less'

import Header from './components/Header'
import Footer from './components/Footer'

class Common extends Component {
  state = { }
  componentWillMount(){ }
  render(){
    return (
      <div className="adminWrap">
        <div className="detail_top">
          <Header menuType="second" />
        </div>
        <div className="main bgfff">
          { this.props.children }
        </div>
        <Footer />
      </div>
    )
  }
}

export default Common