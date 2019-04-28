import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './index.less'

class Login extends Component {
  render(){
    return (
      <div className="loginWrap pa">
        <div className="vertical">这是登陆2页面<br></br>
        <Link to="/home">跳主页</Link></div> 
      </div>
    );
  }
}

export default Login