import './style.scss';
import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.errorMessage === null) {
      return (
        <form className="login-form" onSubmit={this.props.onSubmit}
          method="POST" action="/api/login">
          <input type="email" name="username"
            required placeholder="Email address"></input>
          <input type="password" name="password"
            required placeholder="Password"></input>
          <input type="submit" className="loginButton" value="Log In"
            value={this.props.isLoading ? 'loading' : 'Log In'}></input>
        </form>
      );
    } else {
      return (
        <form required className="login-form" onSubmit={this.props.onSubmit}
          method="POST" action="/api/login">
          <input type="email" name="username"
            required placeholder="Email address"></input>
          <input type="password" name="password"
            required placeholder="Password"></input>
          <span className='error'>{this.props.errorMessage}</span>
          <input type="submit" className="loginButton" value="Log In"
            value={this.props.isLoading ? 'loading' : 'Log In'}></input>
        </form>
      );
    }
  }
}

module.exports = LoginForm;
