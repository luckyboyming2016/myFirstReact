import React,{ Component } from 'react'
import { Link } from 'react-router-dom'

export default class Main extends Component {
  
  render(){
    return (
      <div>
        我是主页<br/>
        <Link to="/main/123">嵌套路由1</Link><br/>
        <Link to="/main/456">嵌套路由2</Link>
        {this.props.children}
      </div>
    );
  }
}