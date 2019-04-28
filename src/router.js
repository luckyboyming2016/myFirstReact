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
import bikeMap from './pages/bikeMap'
import Bar from './pages/charts/bar'
import Pie from './pages/charts/pie'
import Line from './pages/charts/line'
import Rich from './pages/rich'
import Permission from './pages/permission'

import Notpage from './pages/nofound'

class IRouter extends Component {
  render(){
    return (
      <HashRouter>
        <App>
          <Switch>
          <Route path="/login" component={ Login }></Route>
          <Route exact={true} path="/" component={ Login }></Route>
          <Route path="/common" render={()=>
              <Common>
                <Switch>
                  <Route path="/common/order/detail/:id" component={ OrderDetail }></Route>
                  <Route component={ Notpage }></Route>
                </Switch>
              </Common>
            }>
          </Route>
          <Route path="/" render={()=>
              <Admin>
                <Switch>
                  <Route path="/home" component={ Home }></Route>
                  <Route path="/ui/buttons" component={ Buttons }></Route>
                  <Route path="/ui/modals" component={ Modals }></Route>
                  <Route path="/ui/loadings" component={ Loading }></Route>
                  <Route path="/ui/notification" component={ Notification }></Route>
                  <Route path="/ui/messages" component={ Message }></Route>
                  <Route path="/ui/tabs" component={ Tabs }></Route>
                  <Route path="/ui/gallery" component={ Gallery }></Route>
                  <Route path="/ui/carousel" component={ Carousel }></Route>
                  <Route path="/form/login" component={ FormLogin }></Route>
                  <Route path="/form/reg" component={ FormReg }></Route>
                  <Route path="/table/basic" component={ tableBasic }></Route>
                  <Route path="/table/high" component={ tableHight }></Route>
                  <Route path="/city" component={ City }></Route>
                  <Route path="/order" component={ Order }></Route>
                  <Route path="/user" component={ User }></Route>
                  <Route path="/bikeMap" component={ bikeMap }></Route>
                  <Route path="/charts/bar" component={ Bar }></Route>
                  <Route path="/charts/pie" component={ Pie }></Route>
                  <Route path="/charts/line" component={ Line }></Route>
                  <Route path="/rich" component={ Rich }></Route>
                  <Route path="/permission" component={ Permission }></Route>
                  <Route component={ Notpage }></Route>
                </Switch>
              </Admin>  
            }>
          </Route>
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

export default IRouter

