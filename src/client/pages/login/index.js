'use strict';

require('./style.scss');
const ReactDOM = require('react-dom'); // eslint-disable-line no-unused-vars
const React = require('react');

let LoginComponent = require('../../components/login-component/index.js');

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <LoginComponent action={this.handler} />
      </div>
    );
  }
}

export default LoginPage;
