import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './pages/route_demo/route1/home'
import Admin from './Admin'

ReactDOM.render(<Home />, document.getElementById('root'));
serviceWorker.unregister();
