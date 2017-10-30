import React from 'react';

const SignupForm = (props) => (
  <form className="signup-form" method="POST" action="/api/signup"
    onSubmit={props.onSubmit}>
    <input type="text" name="username" pattern=".{4,10}"
      required placeholder="Username (4-10 characters)"></input>

    <input type="text" name="fullname"
      placeholder="Full name (optional)"></input>
    <input type="email" name="email"
      required placeholder="Email Address"></input>
    <input type="text" name="phonenumber"
      placeholder="Phone number (optional)"></input>
    <input type="password" name="password" pattern=".{8,}"
      style={props.style} required
      placeholder="Password (at least 8 characters)"></input>
    {props.error !== '' ? <span className="error">
      {props.error}</span> : null}
    <input type="submit"
      value={props.isLoading ? 'loading' : 'Sign Up'}
      disabled={props.isLoading ? true : false}></input>
  </form>
);

export default SignupForm;
