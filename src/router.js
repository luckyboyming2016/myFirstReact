import React, { Component } from 'react'
import App from './App'
import Admin from './Admin'
import { HashRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loading'
import Notification from './pages/ui/notification'
import Message from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'

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
                <Route path="/admin/ui/modals" component={ Modals }></Route>
                <Route path="/admin/ui/loadings" component={ Loading }></Route>
                <Route path="/admin/ui/notification" component={ Notification }></Route>
                <Route path="/admin/ui/messages" component={ Message }></Route>
                <Route path="/admin/ui/tabs" component={ Tabs }></Route>
                <Route path="/admin/ui/gallery" component={ Gallery }></Route>
                <Route path="/admin/ui/carousel" component={ Carousel }></Route>
                
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

