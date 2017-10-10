const React = require('react');

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form required className="login-form" onSubmit={this.props.onSubmit} method="POST" action="/api/login">
        <input type="text" className="username" name="username" required placeholder="Username or Email address"></input>
        <input type="text" className="password" name="password" required placeholder="Password"></input>
        <input type="submit" className="loginButton" value="Log In" value={this.props.isLoading ? 'loading' : 'Log In'}></input>
      </form>
    );
  }
}

module.exports = LoginForm;
