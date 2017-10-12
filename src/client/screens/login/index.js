'use strict';

require('./style.scss');
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';

let LoginComponent = require('../../components/login-component/index.js');

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={false}/>
        <LoginComponent />
      </div>
    );
  }
}

export default LoginPage;
