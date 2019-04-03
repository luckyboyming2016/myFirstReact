import React,{ Component } from 'react'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import Main from './main'
import About from './about'
import Topic from './../route1/topic'
import Infor from './../route1/infor'
import Home from './home'
import NoMatch from './noMatch'

export default class IRoute extends Component {
  render(){
    return (
      <Router>
        <Home>
          <Switch>
            {/* <Route exact={true} path="/" component={Main}></Route> */}
            <Route path="/main" render={()=>
              <Main>
                <Route path="/main/:id" component={About}></Route>
              </Main>
            }></Route>
            <Route path="/topic" component={Topic}></Route>
            <Route path="/infor" component={Infor}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Home>
      </Router>
    );
  }
}