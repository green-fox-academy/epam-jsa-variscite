'use strict';

require('./style.scss');
const ReactDOM = require('react-dom');
const React = require('react'); // eslint-disable-line no-unused-vars

let LoginComponent = require('../../components/login-component/index.js');

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <LoginComponent />
      </div>
    );
  }
}

export default LoginPage;
