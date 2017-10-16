import React from 'react';
import SignupForm from '../SignupForm';
import './index.scss';
import {Link} from 'react-router-dom';

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
        if (xhr.status === 400) {
          this.handleUserError(xhr);
        } else if (xhr.status === 409) {
          this.handleConflict(xhr);
        } else if (xhr.status === 500) {
          this.handleServerError();
        } else if (xhr.status === 201) {
          this.returnSuccess();
        }
      }
    }.bind(this));
    xhr.open('POST', '/api/signup');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    this.setState({'status': 'loading'});
    xhr.send(data);
  }

  handleUserError(xhr) {
    let error = JSON.parse(xhr.responseText).errorType;
    if (error === 'contentType') {
      this.setState({'error':
        'You entered the wrong content, please try again.'});
    } else if (error === 'missingEmail') {
      this.setState({'error': 'Your Email is missing, please try again.'});
    } else if (error === 'missingPassword') {
      this.setState({'error': 'Your Password is missing, please try again.'});
    } else if (error === 'emailWrong') {
      this.setState({'error':
        'Your Email is wrong, please try again.'});
    } else if (error === 'passwordWrong') {
      this.setState({'error':
        'Your password is wrong, please try again.'});
    }
  }

  handleConflict(xhr) {
    let error = JSON.parse(xhr.responseText).errorType;
    if (error === 'phoneError') {
      this.setState({'error': 'Your phone has been used, please try again.'});
    } else if (error === 'usernameError') {
      this.setState({'error':
        'Your username has been used, please try again.'});
    } else if (error === 'emailError') {
      this.setState({'error': 'Your email has been used, please try again.'});
    }
  }

  handleServerError() {
    this.setState({'error': 'Something wrong, please try again later.'});
  }

  returnSuccess() {
    this.setState({'error': ''});
    window.location.href = '/feed';
  }

  render() {
    return (
      <main className='signupMain'>
        <h1 className='signup-title'>Create A New Account</h1>
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
