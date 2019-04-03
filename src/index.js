import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import Home from './pages/route_demo/route1/home'
// import Router1 from './pages/route_demo/route2/route'
// import Router2 from './pages/route_demo/route3/route'
// import Admin from './Admin'
import Router from './router'

ReactDOM.render(<Router />, document.getElementById('root'));
serviceWorker.unregister();
