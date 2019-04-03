import React,{ Component } from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import Main from './main'
import Infor from './infor'
import Topic from './topic'

export default class Home extends Component {
  render(){
    return (
      <HashRouter>
        <div style={{padding:20}}>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/topic">文章</Link></li>
            <li><Link to="/infor">资讯</Link></li>
          </ul>
          <hr/>  
          <Switch>
            <Route exact={true} path="/" component={Main}></Route>
            <Route path="/topic" component={Topic}></Route>
            <Route path="/infor" component={Infor}></Route>
          </Switch>
          {/* <Route exact={true} path="/" component={Main}></Route>
          <Route path="/topic" component={Topic}></Route>
          <Route path="/infor" component={Infor}></Route> */}
        </div>
      </HashRouter>
    )
  }
}