import React,{ Component } from 'react'
import { HashRouter as Router, Route} from 'react-router-dom'
import Main from './main'
import Topic from './../route1/topic'
import Infor from './../route1/infor'
import Home from './home'

export default class IRoute extends Component {
  render(){
    return (
      <Router>
        <Home>
          {/* <Route exact={true} path="/" component={Main}></Route> */}
          <Route path="/main" render={()=>
            <Main>
              <Route path="/main/a" component={Topic}></Route>
            </Main>
          }></Route>
          <Route path="/topic" component={Topic}></Route>
          <Route path="/infor" component={Infor}></Route>
        </Home>
      </Router>
    );
  }
}