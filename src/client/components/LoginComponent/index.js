'use strict';

import {Link} from 'react-router-dom';
import React from 'react';
import LoginForm from '../LoginForm/index.js';

const Pass = 200;
const ServerError = 500;
const MisMatch = 403;
const FieldError = 400;

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'status': 'being',
      'error': null,
    };
  }

  handleLoginResponse(status, response) {
    let token = JSON.parse(response).token;

    localStorage.setItem('token', token);
    if (status === FieldError) {
      this.handleFieldsError(response);
    } else if (status === MisMatch) {
      this.handleMisMatch(response);
    } else if (status === ServerError) {
      this.handleServerError(response);
    } else if (status === Pass) {
      window.location.href = '/feed';
    }
  }

  handleFieldsError(response) {
    let error = JSON.parse(response).errorType;
    let errorMessage;

    if (error === 'ContentType') {
      errorMessage = 'Something went wrong, please try later!';
      this.setState({'error': errorMessage});
    } else if (error === 'FieldMissing') {
      errorMessage = 'Don\'t try to hack our site!';
      this.setState({'error': errorMessage});
    } else if (error === 'WrongFormat') {
      errorMessage = 'Don\'t try to hack our site!';
      this.setState({'error': errorMessage});
    }
  }

  handleMisMatch(response) {
    if (JSON.parse(response).errorType === 'MisMatch') {
      let errorMessage = 'Username and password mismatch!';

      this.setState({'error': errorMessage});
    }
  }

  handleServerError(response) {
    if (JSON.parse(response).errorType === 'Unknown') {
      let errorMessage = 'Unknown Error!';

      this.setState({'error': errorMessage});
    }
  }

  collectData(event) {
    return {
      'email': event.target.elements.namedItem('email').value,
      'password': event.target.elements.namedItem('password').value,
    };
  }

  sendData(data) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.handleLoginResponse(xhr.status, xhr.response);
        this.setState({'status': 'being'});
      }
    }.bind(this));
    xhr.open('POST', '/api/login');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    this.setState({'status': 'loading'});
    xhr.send(JSON.stringify(data));
  }

  submitLogin(event) {
    event.preventDefault();
    let loginInfo = this.collectData(event);

    this.sendData(loginInfo);
  }

  render() {
    return (
      <main className="login-main">
        <h1 className="login-title">Log in to Variscite</h1>
        <LoginForm isLoading={this.state.status === 'loading'}
          errorMessage={this.state.error}
          onSubmit={this.submitLogin.bind(this)} />
        <p className="or">or</p>
        <Link className="new-account" to="/signup">Creat New Account</Link>
      </main>
    );
  }
}

export default LoginComponent;
