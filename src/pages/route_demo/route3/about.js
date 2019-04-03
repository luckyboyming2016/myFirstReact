import React,{ Component } from 'react'
export default class About extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render(){
    return (
      <div>
        我是测试动态路由的页面<br/>
        <hr/>
         动态路由的参数为: {this.props.match.params.id} 
      </div>
    )
  }
}