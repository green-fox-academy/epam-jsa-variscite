'use strict';

import './style.scss';
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import LoginComponent from '../../components/LoginComponent/index.js';

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
