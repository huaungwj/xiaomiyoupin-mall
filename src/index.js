import React from 'react';
import 'antd/dist/antd.less';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './index.less';
import App from './App';
// import './index.less'
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';
import './assets/css/reset.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root')
);

reportWebVitals();
