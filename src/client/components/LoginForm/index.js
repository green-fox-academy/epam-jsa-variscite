import './style.scss';
import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form required className="login-form" onSubmit={this.props.onSubmit}
        method="POST" action="/api/login">
        <input type="email" name="email"
          required placeholder="Email address"></input>
        <input type="password" name="password"
          required placeholder="Password"></input>
        {this.props.errorMessage !== null ? <span className="error">
          {this.props.errorMessage}</span> : null}
        <input type="submit" className="login-button" value="Log In"
          value={this.props.isLoading ? 'loading' : 'Log In'}></input>
      </form>
    );
  }
}

export default LoginForm;
