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
import FormLogin from './pages/form/login'
import FormReg from './pages/form/reg'
import tableBasic from './pages/table/basic'
import tableHight from './pages/table/high'
import City from './pages/city'
import Order from './pages/order'
import Common from './Common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'

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
                  <Route path="/admin/form/login" component={ FormLogin }></Route>
                  <Route path="/admin/form/reg" component={ FormReg }></Route>
                  <Route path="/admin/table/basic" component={ tableBasic }></Route>
                  <Route path="/admin/table/high" component={ tableHight }></Route>
                  <Route path="/admin/city" component={ City }></Route>
                  <Route path="/admin/order" component={ Order }></Route>
                  <Route path="/admin/user" component={ User }></Route>
                  
                  <Route component={ Notpage }></Route>
                </Switch>
              </Admin>  
            }>
          </Route>
          <Route path="/common" render={()=>
              <Common>
                <Switch>
                  <Route path="/common/order/detail/:id" component={ OrderDetail }></Route>

                  <Route component={ Notpage }></Route>
                </Switch>
              </Common>
            }>
          </Route>
        </App>
      </HashRouter>
    );
  }
}

export default IRouter

