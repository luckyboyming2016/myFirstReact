import React, { Component } from 'react'
import App from './App'
import Admin from './Admin'
import { HashRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import Notpage from './pages/nofound'

class IRouter extends Component {
  render(){
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={ Login }></Route>
          <Route exact={true} path="/" component={ Login }></Route>
          <Route path="/admin" render={()=>
            <Admin>
              <Switch>
                <Route path="/admin/home" component={ Home }></Route>
                <Route path="/admin/ui/buttons" component={ Buttons }></Route>
                <Route component={ Notpage }></Route>
              </Switch>
            </Admin>  
          }></Route>
        </App>
      </HashRouter>
    );
  }
}

export default IRouter

