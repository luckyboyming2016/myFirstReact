import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
export default class Home extends Component {

  render(){
    return (
      <div style={{padding:30}}>
        <ul>
          {/* 此处添加replace属性可以隐藏console打印的警告信息，生产环境没有，开发环境会提示 */}
          <li><Link to='/main'>主页1</Link></li>
          <li><Link to='/infor' replace>资讯1</Link></li>
          <li><Link to='/topic'>文章1</Link></li>
        </ul>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}