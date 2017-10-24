import React from 'react';
import SignupForm from '../SignupForm';
import './style.scss';
import {Link} from 'react-router-dom';

const Pass = 201;
const ServerError = 500;
const Conflict = 409;
const FieldError = 400;

class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'status': 'being',
      'error': '',
    };
  }

  submitHandler(ev) {
    ev.preventDefault();
    let username = ev.target.elements.namedItem('username').value;
    let fullname = ev.target.elements.namedItem('fullname').value;
    let email = ev.target.elements.namedItem('email').value;
    let phonenumber = ev.target.elements.namedItem('phonenumber').value;
    let password = ev.target.elements.namedItem('password').value;
    let obj = {
      username: username,
      fullname: fullname,
      email: email,
      phonenumber: phonenumber,
      password: password,
    };
    let jsonData = JSON.stringify(obj);

    this.sendData(jsonData);
  }

  sendData(data) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.setState({'status': 'being'});
        this.checkError(xhr);
      }
    }.bind(this));
    xhr.open('POST', '/api/signup');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    this.setState({'status': 'loading'});
    xhr.send(data);
  }

  checkError(xhr) {
    if (xhr.status === FieldError) {
      this.handleUserError(xhr);
    } else if (xhr.status === Conflict) {
      this.handleConflict(xhr);
    } else if (xhr.status === ServerError) {
      this.handleServerError();
    } else if (xhr.status === Pass) {
      this.returnSuccess(xhr);
    }
  }

  handleUserError(xhr) {
    let error = JSON.parse(xhr.responseText).errorType;

    if (error === 'contentType') {
      this.setState({
        'error':
        'You entered the wrong content, please try again.',
      });
    } else {
      this.checkUserError(error);
    }
  }

  checkUserError(error) {
    if (error === 'missingEmail') {
      this.setState({'error': 'Your Email is missing, please try again.'});
    } else if (error === 'missingPassword') {
      this.setState({'error': 'Your Password is missing, please try again.'});
    } else if (error === 'emailWrong') {
      this.setState({
        'error':
        'Your Email is wrong, please try again.',
      });
    } else if (error === 'passwordWrong') {
      this.setState({
        'error':
        'Your password is wrong, please try again.',
      });
    }
  }

  handleConflict(xhr) {
    let error = JSON.parse(xhr.responseText).errorType;

    if (error === 'phoneError') {
      this.setState({'error': 'Your phone has been used, please try again.'});
    } else if (error === 'usernameError') {
      this.setState({
        'error':
        'Your username has been used, please try again.',
      });
    } else if (error === 'emailError') {
      this.setState({'error': 'Your email has been used, please try again.'});
    }
  }

  handleServerError() {
    this.setState({'error': 'Something wrong, please try again later.'});
  }

  returnSuccess(xhr) {
    let token = JSON.parse(xhr.response).token;

    localStorage.setItem('token', token);
    this.setState({'error': ''});
    window.location.href = '/feed';
  }

  render() {
    return (
      <main className="signup-main">
        <h1 className="signup-title">Create A New Account</h1>
        <SignupForm
          isLoading={this.state.status === 'loading'}
          onSubmit={this.submitHandler.bind(this)}
          error={this.state.error}/>
        <p className="or">or</p>
        <Link className="login" to="/login">Log in</Link>
      </main>
    );
  }
}

export default SignupComponent;
