import React,{ Component } from 'react'

import './index.less'
class Home extends Component {
  componentDidMount() {
  // console.log(this.props.location.state.id, this.props.location.state.name)
  }
  
  render(){
    return (
      <div className="vertical homeWrap f30">
        欢迎来到创创后台管理系统
      </div>
    )
  }
}

export default Home