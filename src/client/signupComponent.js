var React = require('react');

var SignupComponent = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <button className="logo">V</button>
          <button className="login">Log In</button>
        </header>

        <div className="signup-form">
          <h1>Create a New Account</h1>
          <input type="text" className="username" placeholder="Username"/><span>*</span>
          <input type="text" className="email" placeholder="Email"/><span>*</span>
          <input type="text" className="phonenumber" placeholder="Phone number"/>
          <input type="text" className="fullname" placeholder="Full name"/>
          <input type="text" className="password" placeholder="Password"/><span>*</span>
          <button className="signup">Sign up</button>
        </div>


      </div>
    );
  }
});

export default SignupComponent;