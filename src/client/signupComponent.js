var React = require('react');

var SignupComponent = React.createClass({
  render: function () {
    return (
      <div className="signup-form">
        <h1>Create a New Account</h1>
        <label>Username<input type="text" className="username" placeholder="Username"/></label>
        <label>Email<input type="text" className="email" placeholder="Email"/></label>
        <label>Phone number<input type="text" className="phonenumber" placeholder="Phone number"/></label>
        <label>Full name<input type="text" className="fullname" placeholder="Full name"/></label>
        <label>Password<input type="text" className="password" placeholder="Password"/></label>
        <button className="signup">Sign up</button>
      </div>
    );
  }
});

export default SignupComponent;