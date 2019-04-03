import React,{ Component } from 'react'
import { Link } from 'react-router-dom'

export default class Main extends Component {
  render(){
    return (
      <div>
        我是主页
        <Link to="/main/a">  嵌套路由</Link>
        <br/>
        {this.props.children}
      </div>
    );
  }
}