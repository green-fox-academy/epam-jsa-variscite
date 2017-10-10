const React = require('react');

const SignupForm = (props) => (
  <form required className="signup-form" method="POST" action="/api/signup" onSubmit={props.onSubmit}> 
    <input type="text" className="textInput" name="username" required placeholder="Username"></input>
    <input type="text" className="textInput" name="fullname" placeholder="Full name (optional)"></input>
    <input type="email" className="textInput" name="email" required placeholder="Email Address"></input>
    <input type="text" className="textInput" name="phonenumber" placeholder="Phone number (optional)"></input>
    <input type="password" className="textInput" name="password" required placeholder="Password"></input>
    <input type="submit" className="signupButton" value={props.isLoading ? "loading" : "Sign Up"}></input> 
    <label name="alert">{props.alert}</label>
  </form>
);

module.exports = SignupForm;